package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TerrainResponse {

    private Long id;
    private Double elevation;
    private Double cellSize;
    private String geometry;
    private Boolean demoData;


}
