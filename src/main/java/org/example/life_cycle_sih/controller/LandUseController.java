package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.LandUse;
import org.example.life_cycle_sih.Service.LandUseService;
import org.example.life_cycle_sih.dto.request.LandUseRequest;
import org.example.life_cycle_sih.dto.response.LandUseResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/land_use")
@RequiredArgsConstructor
public class LandUseController {

    private final LandUseService landUseService;

    @PostMapping
    public ResponseEntity<LandUseResponse> create(@Valid @RequestBody LandUseRequest request){
        LandUse landUse = landUseService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(landUseService.convertToResponse(landUse));
    }

    @GetMapping
    public ResponseEntity<List<LandUseResponse>> getAll(){
      List<LandUseResponse> responses = landUseService.getAll().stream().map(landUseService::convertToResponse)
              .toList();
      return ResponseEntity.ok(responses);
    }

    @GetMapping("{id}")
    public ResponseEntity<LandUseResponse> getById(@PathVariable Long id){
        LandUse landUse = landUseService.getById(id);
        return ResponseEntity.ok(landUseService.convertToResponse(landUse));
    }


}
