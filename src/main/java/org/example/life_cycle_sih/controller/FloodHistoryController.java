package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.FloodHistory;
import org.example.life_cycle_sih.Service.FloodHistoryService;
import org.example.life_cycle_sih.dto.request.FloodHistoryRequest;
import org.example.life_cycle_sih.dto.response.FloodHistoryResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flood_history")
@RequiredArgsConstructor
public class FloodHistoryController {
    private final FloodHistoryService floodHistoryService;

    @PostMapping
    public ResponseEntity<FloodHistoryResponse> create(@Valid @RequestBody FloodHistoryRequest request){
        FloodHistory floodHistory = floodHistoryService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(floodHistoryService.convertToResponse(floodHistory));
    }

    @GetMapping
    public ResponseEntity<List<FloodHistoryResponse>> getAll(){
        List<FloodHistoryResponse> responses = floodHistoryService.getAll().stream().map(floodHistoryService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FloodHistoryResponse> getById(@PathVariable Long id){
        FloodHistory floodHistory = floodHistoryService.getById(id);
        return ResponseEntity.ok(floodHistoryService.convertToResponse(floodHistory));
    }

}
