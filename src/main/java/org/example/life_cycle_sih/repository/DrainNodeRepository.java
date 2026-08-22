package org.example.life_cycle_sih.repository;


import org.example.life_cycle_sih.Entity.DrainEdge;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DrainNodeRepository extends JpaRepository<DrainNode,Long> {

}
