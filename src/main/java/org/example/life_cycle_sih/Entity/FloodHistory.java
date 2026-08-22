package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
//import org.locationtech.jts.geom.Polygon;
import org.locationtech.jts.geom.Polygon;

import java.time.LocalDateTime;

@Entity
@Table(name = "flood_history")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FloodHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime eventTime;

    @Column(nullable = false)
    private Double floodDepth;

    @Column(nullable = false)
    private Double duration;

    @Column(nullable = false)
    private String severity;

    @Column(columnDefinition = "geometry(Polygon,4326)", nullable = false)
    private Polygon geometry;

    @Column(nullable = false)
    private Boolean demoData;

}
