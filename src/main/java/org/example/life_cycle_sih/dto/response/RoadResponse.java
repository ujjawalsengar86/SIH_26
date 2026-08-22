package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoadResponse {

    private Long id;
    private String name;
    private String roadType;
    private Double width;
    private String geometry;
    private Boolean demoData;

}
