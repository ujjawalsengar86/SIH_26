package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.example.life_cycle_sih.Service.DrainageService;
import org.example.life_cycle_sih.dto.request.DrainNodeRequest;
import org.example.life_cycle_sih.dto.response.DrainNodeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drainage/nodes")
@RequiredArgsConstructor
public class DrainNodeController {

    private final DrainageService drainageService;

    @PostMapping("/nodes")
    public ResponseEntity<DrainNodeResponse> addNode(@Valid @RequestBody DrainNode  node){
        DrainNode drainNode = drainageService.addNode(node);
        return ResponseEntity.status(HttpStatus.CREATED).body(drainageService.convertToResponse(drainNode));
    }
    @GetMapping("/nodes")
    public ResponseEntity<List<DrainNodeResponse>> getAll(){
        List<DrainNodeResponse> responses = drainageService.getAll().stream().map(drainageService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/nodes/{id}")
    public ResponseEntity<DrainNodeResponse> getById(@PathVariable Long id){
        DrainNode drainNode = drainageService.getById(id);
        return ResponseEntity.ok(drainageService.convertToResponse(drainNode));
    }

}
