package org.eclipse.osc.modules.ocl.loader;

import lombok.Data;

import java.util.List;

@Data
public class Image {

    private List<Provisioner> provisioners;
    private List<BaseImage> base;
    private List<Artifact> artifacts;

}
