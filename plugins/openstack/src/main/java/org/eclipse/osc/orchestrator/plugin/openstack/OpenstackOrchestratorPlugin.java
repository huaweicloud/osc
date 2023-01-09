package org.eclipse.osc.orchestrator.plugin.openstack;

import lombok.extern.slf4j.Slf4j;
import org.apache.karaf.minho.boot.service.ConfigService;
import org.apache.karaf.minho.boot.service.ServiceRegistry;
import org.apache.karaf.minho.boot.spi.Service;
import org.eclipse.osc.orchestrator.OrchestratorPlugin;
import org.eclipse.osc.modules.ocl.loader.Ocl;
import org.openstack4j.api.Builders;
import org.openstack4j.api.OSClient;
import org.openstack4j.model.common.ActionResponse;
import org.openstack4j.model.common.Identifier;
import org.openstack4j.model.common.Payload;
import org.openstack4j.model.common.Payloads;
import org.openstack4j.model.image.v2.ContainerFormat;
import org.openstack4j.model.image.v2.DiskFormat;
import org.openstack4j.model.image.v2.Image;
import org.openstack4j.model.magnum.Container;
import org.openstack4j.model.magnum.ContainerBuilder;
import org.openstack4j.model.network.IPVersionType;
import org.openstack4j.openstack.OSFactory;
import org.openstack4j.openstack.magnum.MagnumContainer;

import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;

@Slf4j
public class OpenstackOrchestratorPlugin implements OrchestratorPlugin, Service {

    private OSClient.OSClientV3 osClient;

    @Override
    public String name() {
        return "osc-openstack-plugin";
    }

    @Override
    public void onRegister(ServiceRegistry serviceRegistry) {
        ConfigService configService = serviceRegistry.get(ConfigService.class);

        if (configService == null) {
            throw new IllegalStateException("Config service is not available");
        }

        String endpoint = configService.getProperty("openstack.endpoint", "http://127.0.0.1:5000/v3");
        String domainId = null;
        if (configService.getProperty("openstack.domainId") != null) {
            domainId = configService.getProperty("openstack.domainId");
        }
        String domainName = null;
        if (configService.getProperty("openstack.domainName") != null) {
            domainName = configService.getProperty("openstack.domainName");
        }
        String projectId = null;
        if (configService.getProperty("openstack.projectId") != null) {
            projectId = configService.getProperty("openstack.projectId");
        }
        String projectName = null;
        if (configService.getProperty("openstack.projectName") != null) {
            projectName = configService.getProperty("openstack.projectName");
        }
        String username = configService.getProperty("openstack.username", "admin");
        String secret = configService.getProperty("openstack.secret", "secret");

        Identifier domainIdentifier = null;
        if (domainId != null) {
            domainIdentifier = Identifier.byId(domainId);
        }
        if (domainName != null) {
            domainIdentifier = Identifier.byName(domainName);
        }

        Identifier projectIdentifier = null;
        if (projectId != null) {
            projectIdentifier = Identifier.byId(projectId);
        }
        if (projectName != null) {
            projectIdentifier = Identifier.byName(projectName);
        }

        if (domainIdentifier != null && projectIdentifier != null) {
            osClient = OSFactory.builderV3()
                    .endpoint(endpoint)
                    .credentials(username, secret)
                    .scopeToProject(projectIdentifier, domainIdentifier)
                    .authenticate();
        }
        if (domainIdentifier == null && projectIdentifier != null) {
            osClient = OSFactory.builderV3()
                    .endpoint(endpoint)
                    .credentials(username, secret)
                    .scopeToProject(projectIdentifier)
                    .authenticate();
        }
        if (domainIdentifier != null && projectIdentifier == null) {
            osClient = OSFactory.builderV3()
                    .endpoint(endpoint)
                    .credentials(username, secret)
                    .scopeToDomain(domainIdentifier)
                    .authenticate();
        }
    }

    @Override
    public void registerManagedService(Ocl ocl) {
        log.info("Register managed service, creating openstack resources");

        log.info("Creating Neutron network resources ...");
        ocl.getNetwork().getSubnet().forEach(subnet -> {
            osClient.networking().subnet().create(Builders.subnet()
                    .name(subnet.getId())
                    .ipVersion(IPVersionType.V4)
                    .cidr(subnet.getCidr())
                    .build());
        });
        ocl.getImage().getArtifacts().forEach(artifact -> {
            if (artifact.getType().equalsIgnoreCase("docker")) {
                log.info("Starting docker container via Magnum ...");
                ContainerBuilder builder = new MagnumContainer.ContainerConcreteBuilder();
                builder.image(artifact.getBase());
                builder.name(artifact.getName());
                Container container = osClient.magnum().createContainer(builder.build());
                osClient.magnum().startContainer(artifact.getName());
                log.info("Docker container " + container.getStatus());
            }
            if (artifact.getType().equalsIgnoreCase("image")) {
                log.info("Starting bare image via Glance ...");
                Image image = osClient.imagesV2().create(Builders.imageV2()
                        .name(artifact.getName())
                        .containerFormat(ContainerFormat.BARE)
                        .visibility(Image.ImageVisibility.PUBLIC)
                        .diskFormat(DiskFormat.QCOW2)
                        .minDisk(0L)
                        .minRam(0L)
                        .build());
                try {
                    Payload<URL> payload = Payloads.create(new URL(artifact.getBase()));
                    ActionResponse upload = osClient.imagesV2().upload(image.getId(), payload, image);
                    log.info("Bare image " + upload.getCode());
                } catch (Exception e) {
                    log.warn("Can't create bare image {}", artifact.getName(), e);
                }
            }
        });
    }

    @Override
    public void updateManagedService(String managedServiceName, Ocl ocl) {
        log.info("Updating managed service {} on openstack", managedServiceName);
    }

    @Override
    public void startManagedService(String managedServiceName) {
        log.info("Start managed service {} on openstack", managedServiceName);
    }

    @Override
    public void stopManagedService(String managedServiceName) {
        log.info("Stop managed service {} on openstack", managedServiceName);
    }

    @Override
    public void unregisterManagedService(String managedServiceName) {
        log.info("Destroy managed service {} from openstack", managedServiceName);
    }
}
