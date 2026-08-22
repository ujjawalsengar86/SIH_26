package org.example.life_cycle_sih.dto.request;


import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LandUseRequest {

    @NotBlank(message = "Land Type is required")
    private String landType;

    @NotNull(message = "Runoff coefficient is required")
    @DecimalMin(value = "0.0", message = "Runoff coefficient cannot be negative")
    @DecimalMax(value = "1.0", message = "Runoff coefficient cannot exceed 1")
    private Double runoffCoefficient;

    @NotNull(message = "Cell size is required")
    @Positive(message = "Cell size must be positive")
    private Double cellSize;

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
