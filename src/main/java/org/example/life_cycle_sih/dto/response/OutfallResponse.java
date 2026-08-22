package org.example.life_cycle_sih.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OutfallResponse {

    private Long id;
    private String name;
    private String waterBody;
    private Double capacity;
    private Boolean operational;
    private String location;
    private Boolean demoData;

}
