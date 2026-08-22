package org.example.life_cycle_sih.controller;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.example.life_cycle_sih.Service.DrainageService;
import org.example.life_cycle_sih.dto.response.DrainNodeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/drainage")
@RequiredArgsConstructor
public class DrainageController {

    private final DrainageService drainageService;

    @PostMapping("/nodes")
    public ResponseEntity<DrainNodeResponse> addNode(@RequestBody DrainNode node){
       DrainNode drainNode = drainageService.addNode(node);
       return ResponseEntity.status(HttpStatus.CREATED).body(drainageService.convertToResponse(drainNode));
    }

    @GetMapping("/nodes")
    public ResponseEntity<List<DrainNodeResponse>> getAllNodes(){
       List<DrainNodeResponse> drainNodes = drainageService.getAll().stream().map(drainageService::convertToResponse).toList();
       return ResponseEntity.ok(drainNodes);
    }

    @GetMapping("/nodes/{id}")
    public ResponseEntity<DrainNodeResponse> getNode(@PathVariable Long id){
       DrainNode drainNode = drainageService.getById(id);
       return ResponseEntity.ok(drainageService.convertToResponse(drainNode));
    }

}
