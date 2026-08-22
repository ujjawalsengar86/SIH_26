package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FloodPredictionResponse {

    private Long id;
    private LocalDateTime predictionTime;
    private LocalDateTime validUntil;
    private Double predictedDepth;
    private String severity;
    private Double confidence;
    private String geometry;
    private Boolean demoData;

}
