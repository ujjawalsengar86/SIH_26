package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.FloodPrediction;
import org.example.life_cycle_sih.Entity.RoadFloodRisk;
import org.example.life_cycle_sih.Entity.RoadSegment;
import org.example.life_cycle_sih.dto.request.RoadFloodRiskRequest;
import org.example.life_cycle_sih.dto.response.RoadFloodRiskResponse;
import org.example.life_cycle_sih.repository.FloodPredictionRepository;
import org.example.life_cycle_sih.repository.RoadFloodRiskRepository;
import org.example.life_cycle_sih.repository.RoadSegmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadFloodRiskService {
    private final RoadFloodRiskRepository roadFloodRiskRepository;
    private final RoadSegmentRepository roadSegmentRepository;
    private final FloodPredictionRepository floodPredictionRepository;

    public RoadFloodRisk create(RoadFloodRiskRequest request){
        RoadSegment roadSegment = roadSegmentRepository.findById(request.getRoadSegmentId()).orElseThrow(()-> new RuntimeException("Road segment not found with id : "+ request.getRoadSegmentId()));
        FloodPrediction floodPrediction = floodPredictionRepository.findById(request.getFloodPredictionId()).orElseThrow(()-> new RuntimeException("Flood prediction not foun with id : "+ request.getFloodPredictionId()));
        RoadFloodRisk risk = RoadFloodRisk.builder()
                .roadSegment(roadSegment)
                .floodPrediction(floodPrediction)
                .waterDepth(request.getWaterDepth())
                .riskLevel(request.getRiskLevel())
                .passable(request.getPassable())
                .demoData(request.getDemoData())
                .build();
        return roadFloodRiskRepository.save(risk);
    }

    public List<RoadFloodRisk> getAll(){
        return roadFloodRiskRepository.findAll();
    }
    public RoadFloodRisk getById(Long id){
        return roadFloodRiskRepository.findById(id).orElseThrow(()-> new RuntimeException("Road flood risk not found with id : "+ id));

    }
    public RoadFloodRiskResponse convertToResponse(RoadFloodRisk risk){
        return new RoadFloodRiskResponse(
                risk.getId(),
                risk.getRoadSegment().getId(),
                risk.getFloodPrediction().getId(),
                risk.getWaterDepth(),
                risk.getRiskLevel(),
                risk.getPassable(),
                risk.getDemoData()
        );
    }
}
