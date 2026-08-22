package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.FloodPrediction;
import org.example.life_cycle_sih.Service.FloodPredictionService;
import org.example.life_cycle_sih.dto.request.FloodPredictionRequest;
import org.example.life_cycle_sih.dto.response.FloodPredictionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flood_predictions")
@RequiredArgsConstructor
public class FloodPredictionController {
    private final FloodPredictionService floodPredictionService;

    @PostMapping
    public ResponseEntity<FloodPredictionResponse> create(@Valid @RequestBody FloodPredictionRequest request){
        FloodPrediction prediction = floodPredictionService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(floodPredictionService.convertToResponse(prediction));
    }

    @GetMapping
    public ResponseEntity<List<FloodPredictionResponse>> getAll(){
        List<FloodPredictionResponse> responses = floodPredictionService.getAll().stream().map(floodPredictionService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FloodPredictionResponse> getById(@PathVariable Long id){
        FloodPrediction prediction = floodPredictionService.getById(id);
        return ResponseEntity.ok(floodPredictionService.convertToResponse(prediction));
    }

}
