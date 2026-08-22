package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PumpStationRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    private Double capacity;

    @NotNull(message = "Pump count is required")
    @Positive(message = "Pump count must be positive")
    private Integer pumpCount;

    @NotNull(message = "Operational status is required")
    private Boolean operational;

    @NotNull(message = "Latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull(message = "Longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;
}
