package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FloodHistoryResponse {

    private Long id;
    private LocalDateTime eventTime;
    private Double floodDepth;
    private Double duration;
    private String severity;
    private String geometry;
    private Boolean demoData;

}
