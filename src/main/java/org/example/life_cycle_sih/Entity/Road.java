package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.LineString;

@Entity
@Table(name = "roads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Road {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String roadType;

    @Column(nullable = false)
    private Double width;

    @Column(nullable = false)
    private Boolean demoData;

    @Column(columnDefinition = "geometry(LineString,4326)", nullable = false)
    private LineString geometry;

}
