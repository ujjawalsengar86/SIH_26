package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoadFloodRiskResponse {

    private Long id;
    private Long roadSegmentId;
    private Long floodPredictionId;
    private Double waterDepth;
    private String riskLevel;
    private Boolean passable;
    private Boolean demoData;

}
