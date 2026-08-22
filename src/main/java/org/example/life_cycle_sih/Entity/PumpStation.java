package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "pump_stations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PumpStation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double capacity;

    @Column(nullable = false)
    private Integer pumpCount;

    @Column(nullable = false)
    private Boolean operational;

    @Column(nullable = false)
    private Boolean demoData;

    @Column(
            columnDefinition = "geometry(Point,4326)",
            nullable = false
    )
    private Point location;
}
