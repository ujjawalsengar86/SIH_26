package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.RoadFloodRisk;
import org.example.life_cycle_sih.Service.RoadFloodRiskService;
import org.example.life_cycle_sih.dto.request.RoadFloodRiskRequest;
import org.example.life_cycle_sih.dto.response.RoadFloodRiskResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/road_flood_risk")
@RequiredArgsConstructor
public class RoadFloodRiskController {

    private final RoadFloodRiskService roadFloodRiskService;

    @PostMapping
    public ResponseEntity<RoadFloodRiskResponse> create(@Valid @RequestBody RoadFloodRiskRequest request){
        RoadFloodRisk risk = roadFloodRiskService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(roadFloodRiskService.convertToResponse(risk));
    }

    @GetMapping
    public ResponseEntity<List<RoadFloodRiskResponse>> getAll(){
        List<RoadFloodRiskResponse> roadFloodRisks = roadFloodRiskService.getAll().stream().map(roadFloodRiskService::convertToResponse).toList();
        return ResponseEntity.ok(roadFloodRisks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoadFloodRiskResponse> getById(@PathVariable Long id){
        RoadFloodRisk roadFloodRisk = roadFloodRiskService.getById(id);
        return ResponseEntity.ok(roadFloodRiskService.convertToResponse(roadFloodRisk));
    }




}
