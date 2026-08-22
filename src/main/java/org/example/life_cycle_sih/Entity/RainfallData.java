package org.example.life_cycle_sih.Entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "rainfall_data")
public class RainfallData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double latitude;
    private double longitude;
    private LocalDateTime timestamp;
    private boolean forecast;
}
