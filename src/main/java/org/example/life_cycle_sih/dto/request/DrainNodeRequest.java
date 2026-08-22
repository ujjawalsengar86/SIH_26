package org.example.life_cycle_sih.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class DrainNodeRequest {

    @NotNull(message = "Latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @NotNull(message = "Elevation is required")
    private Double elevation;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    private Double capacity;

    @NotNull(message = "nodeType cannot be null")
    private String nodeType;

    @NotNull(message = "location cannot be null")
    private String location;
}
