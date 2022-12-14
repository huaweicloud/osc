package org.eclipse.osc.modules.ocl.loader;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class VPC extends RuntimeBase {

    private String name;
    private String cidr;

}
