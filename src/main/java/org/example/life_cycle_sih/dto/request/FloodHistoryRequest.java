package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FloodHistoryRequest {

    @NotNull(message = "Event time is required")
    private LocalDateTime eventTime;

    @NotNull(message = "Flood depth is required")
    @Positive(message = "Flood depth cannot be negative")
    private Double floodDepth;

    @NotNull(message = "Duration is required")
    @Positive(message = "Duration must be positive")
    private Double duration;

    @NotBlank(message = "Severity is required")
    private String severity;

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
