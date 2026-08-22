package org.example.life_cycle_sih.repository;


import org.example.life_cycle_sih.Entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TerrainRepository extends JpaRepository<Terrain,Long> {


}
