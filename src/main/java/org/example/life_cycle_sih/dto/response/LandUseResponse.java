package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LandUseResponse {

    private Long id;
    private String landType;
    private Double runoffCoefficient;
    private Double cellSize;
    private String geometry;
    private Boolean demoData;
}
