package org.example.life_cycle_sih.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class DrainEdgeRequest {

    @NotNull(message = "From node ID is required")
    private Long fromNodeId;

    @NotNull(message = "To node ID is required")
    private Long toNodeId;

    @NotNull(message = "Length is required")
    @Positive(message = "Length must be positive")
    private Double length;

    @NotNull(message = "Diameter is required")
    @Positive(message = "Diameter must be positive")
    private Double diameter;

    @NotNull(message = "Capacity is required")
    @Positive(message = "Capacity must be positive")
    private Double capacity;

    @NotNull(message = "Edge type  is required")
    private String edgeType;

    @NotNull(message = "Demo data flag is required")
    private Boolean demoData;

}

