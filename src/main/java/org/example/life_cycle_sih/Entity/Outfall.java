package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "outfalls")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Outfall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String waterBody;

    @Column(nullable = false)
    private Double capacity;

    @Column(nullable = false)
    private Boolean operational;

    @Column(columnDefinition = "geometry(Point,4326)", nullable = false)
    private Point location;


    @Column(nullable = false)
    private Boolean demoData;


}
