package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.PumpStation;
import org.example.life_cycle_sih.Service.PumpStationService;
import org.example.life_cycle_sih.dto.request.PumpStationRequest;
import org.example.life_cycle_sih.dto.response.PumpStationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pump_stations")
@RequiredArgsConstructor
public class PumpStationController {
    private final PumpStationService pumpStationService;

    @PostMapping
    public ResponseEntity<PumpStationResponse> create(@Valid @RequestBody PumpStationRequest request){
        PumpStation pumpStation = pumpStationService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(pumpStationService.convertToResponse(pumpStation));
    }

    @GetMapping
    public ResponseEntity<List<PumpStationResponse>> getAll(){
        List<PumpStationResponse> responses  = pumpStationService.getAll().stream().map(pumpStationService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }
    @GetMapping("/{id}")
    public ResponseEntity<PumpStationResponse> getById(@PathVariable Long id){
        PumpStation pumpStation = pumpStationService.getById(id);
        return ResponseEntity.ok(pumpStationService.convertToResponse(pumpStation));
    }
}
