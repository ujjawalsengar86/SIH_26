package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainEdge;
import org.example.life_cycle_sih.Service.DrainEdgeService;
import org.example.life_cycle_sih.dto.request.DrainEdgeRequest;
import org.example.life_cycle_sih.dto.response.DrainEdgeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drainage/edges")
@RequiredArgsConstructor
public class DrainEdgeController {
    private final DrainEdgeService drainEdgeService;

    @PostMapping
    public ResponseEntity<DrainEdgeResponse> create(@Valid @RequestBody DrainEdgeRequest request){
        DrainEdge drainEdge = drainEdgeService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(drainEdgeService.convertToResponse(drainEdge));
    }

    @GetMapping
    public ResponseEntity<List<DrainEdgeResponse>> getAll(){
        List<DrainEdgeResponse> drainEdgeResponses = drainEdgeService.getAll().stream().map(drainEdgeService::convertToResponse).toList();
        return ResponseEntity.ok(drainEdgeResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DrainEdgeResponse> getById(@PathVariable Long id){
        DrainEdge drainEdge = drainEdgeService.getById(id);
        return ResponseEntity.ok(drainEdgeService.convertToResponse(drainEdge));
    }
}
