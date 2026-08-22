package org.example.life_cycle_sih.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CatchmentRequest {
    @NotBlank(message = "Name is Required")
    private String name;
    @NotNull(message = "Area is required")
    @Positive(message = "Area must be positive")
    private Double area;

    @NotNull(message = "latitude is required")
    @DecimalMin("-90.0")
    @DecimalMax("90.0")
    private Double latitude;

    @NotNull(message = "longitude is required")
    @DecimalMin("-180.0")
    @DecimalMax("180.0")
    private Double longitude;

    @NotNull(message = "Cell size is required")
    @Positive(message = "Cell size must be positive")
    private Double cellSize;

    @NotNull(message = "Drain node ID is required")
    private Long drainNodeId;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;

}
