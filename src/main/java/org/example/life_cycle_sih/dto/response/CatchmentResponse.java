package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CatchmentResponse {
    private Long id;
    private String name;
    private Double area;
    private String geometry;
    private Long drainNodeId;
    private Boolean demoData;
}
