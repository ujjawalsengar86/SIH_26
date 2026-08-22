package org.example.life_cycle_sih.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.locationtech.jts.geom.Polygon;


@Entity
@Table(name = "land_use")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LandUse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String landType;

    @Column(nullable = false)
    private Double runoffCoefficient;

   private Double cellSize;

   @Column(columnDefinition = "geometry(Polygon,4326)",nullable = false)
   private Polygon geometry;
    @Column(nullable = false)
    private Boolean demoData;


}
