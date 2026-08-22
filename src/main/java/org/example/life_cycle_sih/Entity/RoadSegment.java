package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.LineString;

@Entity
@Table(name = "road_segments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "road_id", nullable = false)
    private Road road;

    @Column(nullable = false)
    private Double length;

    @Column(nullable = false)
    private Integer segmentOrder;

    @Column(columnDefinition = "geometry(LineString,4326)", nullable = false)
    private LineString geometry;

    @Column(nullable = false)
    private Boolean demoData;
}
