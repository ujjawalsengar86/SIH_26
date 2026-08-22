package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.FloodHistory;
import org.example.life_cycle_sih.dto.request.FloodHistoryRequest;
import org.example.life_cycle_sih.dto.response.FloodHistoryResponse;
import org.example.life_cycle_sih.repository.FloodHistoryRepository;
//import org.example.life_cycle_sih.repository.FloodRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FloodHistoryService {

    private final FloodHistoryRepository floodHistoryRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    private Polygon createFloodPolygon(double longitude,double latitude,double cellSize){
        double degreeSize = cellSize / 111000.0;
        Coordinate[] coordinates = {new Coordinate(longitude, latitude), new Coordinate(longitude + degreeSize, latitude), new Coordinate(longitude + degreeSize, latitude + degreeSize),new Coordinate(longitude, latitude + degreeSize),new Coordinate(longitude, latitude)};
        return geometryFactory.createPolygon(coordinates);

    }
    public FloodHistory create(FloodHistoryRequest request){
        Polygon polygon = createFloodPolygon(request.getLongitude(),request.getLatitude(),request.getCellSize());
        polygon.setSRID(4326);

        FloodHistory floodHistory = FloodHistory.builder()
                .eventTime(request.getEventTime())
                .floodDepth(request.getFloodDepth())
                .duration(request.getDuration())
                .severity(request.getSeverity())
                .geometry(polygon)
                .demoData(request.getDemoData())
                .build();
        return floodHistoryRepository.save(floodHistory);
    }

    public List<FloodHistory> getAll(){
        return floodHistoryRepository.findAll();
    }

    public FloodHistory getById(Long id){
        return floodHistoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Flood history not found with id : " + id));
    }

    public FloodHistoryResponse convertToResponse(FloodHistory floodHistory){
        return new FloodHistoryResponse(
                floodHistory.getId(),
                floodHistory.getEventTime(),
                floodHistory.getFloodDepth(),
                floodHistory.getDuration(),
                floodHistory.getSeverity(),
                floodHistory.getGeometry() != null
                        ? floodHistory.getGeometry().toText()
                        : null,
                floodHistory.getDemoData()
        );
    }
}
