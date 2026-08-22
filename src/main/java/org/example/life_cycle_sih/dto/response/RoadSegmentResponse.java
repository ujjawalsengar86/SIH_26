package org.example.life_cycle_sih.dto.response;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoadSegmentResponse {

    private Long id;
    private Long roadId;
    private Double length;
    private Integer segmentOrder;
    private String geometry;
    private Boolean demoData;

}
