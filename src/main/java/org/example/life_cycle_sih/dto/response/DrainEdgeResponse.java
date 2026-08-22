package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrainEdgeResponse {

    private Long id;
    private Long fromNodeId;
    private Long toNodeId;
    private Double length;
    private Double diameter;
    private Double capacity;
    private String edgeType;
    private String geometry;
    private Boolean demoData;

}
