package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Road;
import org.example.life_cycle_sih.Service.RoadService;
import org.example.life_cycle_sih.dto.request.RoadRequest;
import org.example.life_cycle_sih.dto.response.RoadResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roads")
@RequiredArgsConstructor
public class RoadController {
    private final RoadService roadService;

    @PostMapping
    public ResponseEntity<RoadResponse> create(@Valid @RequestBody RoadRequest request){
        Road road = roadService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(roadService.convertToResponse(road));
    }

    @GetMapping
    public ResponseEntity<List<RoadResponse>> getAll(){
        List<RoadResponse> responses = roadService.getAll().stream().map(roadService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoadResponse> getById(@PathVariable Long id){
        Road road = roadService.getById(id);
        return ResponseEntity.ok(roadService.convertToResponse(road));
    }
    
}
