package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "drain_nodes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrainNode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private double elevation;
    @Column(nullable = false)
    private double capacity;
    @Column(nullable = false)
    private String nodeType;

    @Column(columnDefinition = "geometry(Point,4326)")
    private Point location;

}
