package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Polygon;

@Entity
@Table(name = "catchments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Catchment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double area;

    @Column(nullable = false)
    private Boolean demoData;

    @Column(columnDefinition = "geometry(Polygon,4326)",nullable = false)
    private Polygon geometry;

    @ManyToOne
    @JoinColumn(name = "drain_node_id",nullable = false)
    private DrainNode drainNode;


}

