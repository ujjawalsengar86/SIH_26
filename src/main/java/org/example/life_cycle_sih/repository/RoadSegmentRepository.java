package org.example.life_cycle_sih.repository;

import org.example.life_cycle_sih.Entity.RoadSegment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoadSegmentRepository extends JpaRepository<RoadSegment,Long> {

    List<RoadSegment> findByRoadIdOrderBySegmentOrder(Long id);
}
