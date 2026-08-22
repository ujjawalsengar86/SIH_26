package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PumpStationResponse {

    private Long id;
    private String name;
    private Double capacity;
    private Integer pumpCount;
    private Boolean operational;
    private String location;
    private Boolean demoData;

}
