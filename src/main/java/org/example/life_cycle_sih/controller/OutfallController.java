package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.example.life_cycle_sih.Entity.Outfall;
import org.example.life_cycle_sih.Service.OutfallService;
import org.example.life_cycle_sih.dto.request.OutfallRequest;
import org.example.life_cycle_sih.dto.response.OutfallResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/outfalls")
@RequiredArgsConstructor
public class OutfallController {

    private final OutfallService outfallService;

    @PostMapping
    public ResponseEntity<OutfallResponse> create(@Valid @RequestBody OutfallRequest request){
        Outfall outfall = outfallService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(outfallService.convertToResponse(outfall));
    }

    @GetMapping
    public ResponseEntity<List<OutfallResponse>> getAll(){
        List<OutfallResponse> responses = outfallService.getAll().stream().map(outfallService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OutfallResponse> getById(@PathVariable Long id){
        Outfall outfall = outfallService.getById(id);
        return ResponseEntity.ok(outfallService.convertToResponse(outfall));
    }

}
