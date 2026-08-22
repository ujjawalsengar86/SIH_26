package org.example.life_cycle_sih.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.RoadSegment;
import org.example.life_cycle_sih.Service.RoadSegmentService;
import org.example.life_cycle_sih.dto.request.RoadSegmentRequest;
import org.example.life_cycle_sih.dto.response.RoadSegmentResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/road_segments")
@RequiredArgsConstructor
public class RoadSegmentController {

    private final RoadSegmentService roadSegmentService;

    @PostMapping
    public ResponseEntity<RoadSegmentResponse> create(@Valid @RequestBody RoadSegmentRequest request){
        RoadSegment roadSegment = roadSegmentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(roadSegmentService.convertToResponse(roadSegment));
    }

    @GetMapping
    public ResponseEntity<List<RoadSegmentResponse>> getAll(){
        List<RoadSegmentResponse> responses = roadSegmentService.getAll().stream().map(roadSegmentService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoadSegmentResponse> getById(@PathVariable Long id){
        RoadSegment segment = roadSegmentService.getById(id);
        return ResponseEntity.ok(roadSegmentService.convertToResponse(segment));
    }

    @GetMapping("/road/{roadId}")
    public ResponseEntity<List<RoadSegmentResponse>> getByRoadId(@PathVariable Long roadId) {
            List<RoadSegmentResponse> responses = roadSegmentService.getByRoadId(roadId).stream().map(roadSegmentService::convertToResponse).toList();
        return ResponseEntity.ok(responses);
    }
}
