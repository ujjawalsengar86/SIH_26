package org.example.life_cycle_sih.repository;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainEdge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrainEdgeRepository extends JpaRepository<DrainEdge,Long> {

}
