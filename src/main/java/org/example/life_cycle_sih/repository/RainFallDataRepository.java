package org.example.life_cycle_sih.repository;

import org.example.life_cycle_sih.Entity.RainfallData;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RainFallDataRepository  extends JpaRepository<RainfallData,Long> {

    List<RainfallData> findByForecast(boolean forecast);
    List<RainfallData> findByTimestampBetween(LocalDateTime start,LocalDateTime end);
}
