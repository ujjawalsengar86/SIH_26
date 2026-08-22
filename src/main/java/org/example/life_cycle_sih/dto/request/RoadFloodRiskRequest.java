package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RoadFloodRiskRequest {
    @NotNull(message = "Road segment id is required")
    private Long roadSegmentId;

    @NotNull(message = "Flood prediction id is required")
    private Long floodPredictionId;

    @NotNull(message = "Water depth is required")
    @Positive(message = "Water depth cannot be negative")
    private Double waterDepth;

    @NotNull(message = "Risk level is required")
    private String riskLevel;

    @NotNull(message = "Passable status is required")
    private Boolean passable;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;


}
