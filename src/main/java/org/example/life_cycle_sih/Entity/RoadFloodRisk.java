package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "road_flood_risks")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoadFloodRisk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "road_segment_id", nullable = false)
    private RoadSegment roadSegment;

    @ManyToOne
    @JoinColumn(name = "flood_prediction_id", nullable = false)
    private FloodPrediction floodPrediction;

    @Column(nullable = false)
    private Double waterDepth;

    @Column(nullable = false)
    private String riskLevel;

    @Column(nullable = false)
    private Boolean passable;

    @Column(nullable = false)
    private Boolean demoData;

}
