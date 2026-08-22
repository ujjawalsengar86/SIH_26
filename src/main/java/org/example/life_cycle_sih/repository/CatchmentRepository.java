package org.example.life_cycle_sih.repository;

import org.example.life_cycle_sih.Entity.Catchment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatchmentRepository extends JpaRepository<Catchment,Long> {

}
