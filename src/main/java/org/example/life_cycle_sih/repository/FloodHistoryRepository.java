package org.example.life_cycle_sih.repository;

import org.example.life_cycle_sih.Entity.FloodHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloodHistoryRepository extends JpaRepository<FloodHistory,Long> {
}
