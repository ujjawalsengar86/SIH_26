package org.example.life_cycle_sih.repository;

import org.example.life_cycle_sih.Entity.PumpStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PumpStationRepository extends JpaRepository<PumpStation,Long> {

}
