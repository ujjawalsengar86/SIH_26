package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Terrain;
import org.example.life_cycle_sih.Service.TerrainService;
import org.example.life_cycle_sih.dto.request.TerrainRequest;
import org.example.life_cycle_sih.dto.response.TerrainResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/terrain")
@RequiredArgsConstructor
public class TerrainController {

    private final TerrainService terrainService;

    @PostMapping
    public ResponseEntity<TerrainResponse> create(@Valid @RequestBody TerrainRequest request) {
        Terrain terrain = terrainService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(terrainService.convertToResponse(terrain));
    }

    @GetMapping
    public ResponseEntity<List<TerrainResponse>> getAll() {
        List<TerrainResponse> response = terrainService.getAll()
                        .stream()
                        .map(terrainService::convertToResponse)
                        .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TerrainResponse> getById(@PathVariable Long id) {
        Terrain terrain = terrainService.getById(id);
        return ResponseEntity.ok(terrainService.convertToResponse(terrain));
    }
}