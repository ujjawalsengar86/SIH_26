package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.FloodPrediction;
import org.example.life_cycle_sih.dto.request.FloodPredictionRequest;
import org.example.life_cycle_sih.dto.response.FloodPredictionResponse;
import org.example.life_cycle_sih.repository.FloodPredictionRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FloodPredictionService {
    private final FloodPredictionRepository floodPredictionRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    public FloodPrediction create(FloodPredictionRequest request){
        Polygon polygon = createPredictionPolygon(request.getLatitude(),request.getLongitude(),request.getCellSize());
        polygon.setSRID(4326);
        FloodPrediction prediction = FloodPrediction.builder()
                .predictionTime(request.getPredictionTime())
                .validUntil(request.getValidUntil())
                .predictedDepth(request.getPredictedDepth())
                .severity(request.getSeverity())
                .confidence(request.getConfidence())
                .geometry(polygon)
                .demoData(request.getDemoData())
                .build();
        return floodPredictionRepository.save(prediction);
    }

    public List<FloodPrediction> getAll(){
        return floodPredictionRepository.findAll();
    }

    public FloodPrediction getById(Long id){
        return floodPredictionRepository.findById(id).orElseThrow(()-> new RuntimeException("flood prediction not found with id : "+ id));
    }

    public FloodPredictionResponse convertToResponse(FloodPrediction prediction){
        return new FloodPredictionResponse(
                prediction.getId(),
                prediction.getPredictionTime(),
                prediction.getValidUntil(),
                prediction.getPredictedDepth(),
                prediction.getSeverity(),
                prediction.getConfidence(),
                prediction.getGeometry() != null
                        ? prediction.getGeometry().toText()
                        : null,
                prediction.getDemoData()
        );

    }
    private Polygon createPredictionPolygon(double latitude, double longitude, double cellSize) {
        double degreeSize = cellSize / 111000.0;
        Coordinate[] coordinates = {new Coordinate(longitude, latitude), new Coordinate(longitude + degreeSize, latitude), new Coordinate(longitude + degreeSize, latitude + degreeSize), new Coordinate(longitude, latitude + degreeSize), new Coordinate(longitude, latitude)};
        return geometryFactory.createPolygon(coordinates);
    }
}
