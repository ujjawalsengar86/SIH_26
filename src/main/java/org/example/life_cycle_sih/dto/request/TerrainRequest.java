package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NonNull;

@Data
public class TerrainRequest {
    @NotNull(message = "Elevation is required")
    private Double elevation;

    @NotNull(message = "Cell size is required")
    @Positive(message = "Cell size must be positive")
    private Double cellSize;

    @NotNull(message = "latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull(message = "longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;


}
