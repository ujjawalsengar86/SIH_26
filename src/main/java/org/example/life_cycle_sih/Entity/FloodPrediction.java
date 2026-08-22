package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Polygon;

import java.time.LocalDateTime;

@Entity
@Table(name = "flood_predictions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FloodPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime predictionTime;

    @Column(nullable = false)
    private LocalDateTime validUntil;

    @Column(nullable = false)
    private Double predictedDepth;

    @Column(nullable = false)
    private String severity;

    @Column(nullable = false)
    private Double confidence;

    @Column(columnDefinition = "geometry(Polygon,4326)", nullable = false)
    private Polygon geometry;

    @Column(nullable = false)
    private Boolean demoData;
}
