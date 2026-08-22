package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FloodPredictionRequest {
    @NotNull(message = "Prediction time is required")
    private LocalDateTime predictionTime;

    @NotNull(message = "Valid until time is required")
    private LocalDateTime validUntil;

    @NotNull(message = "Predicted depth is required")
    @Positive(message = "Predicted depth cannot be negative")
    private Double predictedDepth;

    @NotBlank(message = "Severity is required")
    private String severity;

    @NotNull(message = "Confidence is required")
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "1.0")
    private Double confidence;

    @NotNull(message = "Latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @NotNull(message = "Cell size is required")
    @Positive(message = "Cell size must be positive")
    private Double cellSize;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;
}
