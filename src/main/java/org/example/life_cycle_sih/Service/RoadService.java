package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Road;
import org.example.life_cycle_sih.dto.request.RoadRequest;
import org.example.life_cycle_sih.dto.response.RoadResponse;
import org.example.life_cycle_sih.repository.RoadRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadService {

    private final RoadRepository roadRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public Road create(RoadRequest request){
        Coordinate start = new Coordinate(request.getStartLongitude(),request.getStartLatitude());
        Coordinate end = new Coordinate(request.getEndLongitude(),request.getEndLatitude());
        LineString lineString = geometryFactory.createLineString(new Coordinate[]{start,end});
        lineString.setSRID(4326);
        Road road = Road.builder()
                .name(request.getName())
                .roadType(request.getRoadType())
                .width(request.getWidth())
                .geometry(lineString)
                .demoData(request.getDemoData())
                .build();
        return roadRepository.save(road);
    }
    public List<Road> getAll(){
        return roadRepository.findAll();
    }
    public Road getById(Long id){
        return roadRepository.findById(id).orElseThrow(()-> new RuntimeException("Road not found with id : " + id));
    }

    public RoadResponse convertToResponse(Road road){
        return new RoadResponse(
                road.getId(),
                road.getName(),
                road.getRoadType(),
                road.getWidth(),
                road.getGeometry()!=null?road.getGeometry().toText():null,
                road.getDemoData()
        );
    }
}
