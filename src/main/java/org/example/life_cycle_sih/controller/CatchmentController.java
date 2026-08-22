package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Catchment;
import org.example.life_cycle_sih.Service.CatchmentService;
import org.example.life_cycle_sih.dto.request.CatchmentRequest;
import org.example.life_cycle_sih.dto.response.CatchmentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/catchments")
@RequiredArgsConstructor
public class CatchmentController {
    private final CatchmentService catchmentService;

    @PostMapping
    public ResponseEntity<CatchmentResponse> create(@Valid @RequestBody CatchmentRequest request){
        Catchment catchment = catchmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(catchmentService.convertToResponse(catchment));
    }

    @GetMapping
    public ResponseEntity<List<CatchmentResponse>> getAll(){
        List<CatchmentResponse> responses = catchmentService.getAll().stream().map(catchmentService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CatchmentResponse> getById(@PathVariable Long id){
        Catchment catchment = catchmentService.getById(id);
        return ResponseEntity.ok(catchmentService.convertToResponse(catchment));
    }


}
