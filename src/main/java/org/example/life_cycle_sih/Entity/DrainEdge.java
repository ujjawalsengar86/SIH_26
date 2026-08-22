package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.LineString;

@Entity
@Table(name = "drain_edges")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DrainEdge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "from_node_id",nullable = false)
    private DrainNode fromNode;

    @ManyToOne
    @JoinColumn(name = "to_node_id",nullable = false)
    private DrainNode toNode;

    @Column(nullable = false)
    private double length;

    @Column(nullable = false)
    private double diameter;

    @Column(nullable = false)
    private double capacity;

    @Column(nullable = false)
    private String edgeType;

    @Column(nullable = false)
    private Boolean demoData;

    private LineString geometry;


}
