package org.eclipse.osc.services.logging;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import org.apache.karaf.minho.boot.service.ConfigService;
import org.apache.karaf.minho.boot.service.ServiceRegistry;
import org.apache.karaf.minho.boot.spi.Service;

import java.io.IOException;
import java.util.Objects;
import java.util.logging.LogManager;

@Slf4j
public class LogFormatConfiguration implements Service {

    @Override
    public String name() {
        return "osc-logging-configuration";
    }

    @Override
    public int priority() {
        return 1;
    }

    @Override
    public void onRegister(ServiceRegistry serviceRegistry) throws IOException {
        log.info("Registering log configuration");
        if (Objects.isNull(serviceRegistry)) {
            throw new IllegalStateException("ServiceRegistry is null");
        }
        ConfigService configService = serviceRegistry.get(ConfigService.class);
        if (Objects.isNull(configService)) {
            throw new IllegalStateException("Config service is not present in the registry");
        }
        if (Objects.nonNull(configService.getProperty("jul.log.format"))) {
            LogManager.getLogManager().reset();
            System.setProperty("java.util.logging.SimpleFormatter.format",
                    configService.getProperty("jul.log.format"));
            LogManager.getLogManager().readConfiguration();
        }
    }
}
