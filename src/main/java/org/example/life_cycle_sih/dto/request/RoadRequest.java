package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data

public class RoadRequest {
    @NotBlank(message = "Road name is required")
    private String name;

    @NotBlank(message = "Road type is required")
    private String roadType;

    @NotNull(message = "Width is required")
    @Positive(message = "Width must be positive")
    private Double width;

    @NotNull(message = "Start latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double startLatitude;

    @NotNull(message = "Start longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double startLongitude;

    @NotNull(message = "End latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double endLatitude;

    @NotNull(message = "End longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double endLongitude;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;
}
