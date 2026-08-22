package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class RoadSegmentRequest {
    @NotNull(message = "Road ID is required")
    private Long roadId;

    @NotNull(message = "Length is required")
    @Positive(message = "Length must be positive")
    private Double length;

    @NotNull(message = "Segment order is required")
    @Positive(message = "Segment order must be positive")
    private Integer segmentOrder;

    @NotNull(message = "Start latitude is required")
    private Double startLatitude;

    @NotNull(message = "Start longitude is required")
    private Double startLongitude;

    @NotNull(message = "End latitude is required")
    private Double endLatitude;

    @NotNull(message = "End longitude is required")
    private Double endLongitude;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;

}
