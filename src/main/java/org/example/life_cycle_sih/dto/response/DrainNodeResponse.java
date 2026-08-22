package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DrainNodeResponse {

    private Long id;
    private Double latitude;
    private Double longitude;
    private Double elevation;
    private Double capacity;
    private String nodeType;
    private String location;

}
