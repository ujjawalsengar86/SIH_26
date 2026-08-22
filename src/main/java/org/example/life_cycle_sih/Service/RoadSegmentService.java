package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Road;
import org.example.life_cycle_sih.Entity.RoadSegment;
import org.example.life_cycle_sih.dto.request.RoadSegmentRequest;
import org.example.life_cycle_sih.dto.response.RoadSegmentResponse;
import org.example.life_cycle_sih.repository.RoadRepository;
import org.example.life_cycle_sih.repository.RoadSegmentRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadSegmentService {

    private final RoadSegmentRepository roadSegmentRepository;
    private final RoadRepository roadRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public RoadSegment create(RoadSegmentRequest request){
        Road road = roadRepository.findById(request.getRoadId()).orElseThrow(()->new RuntimeException("Road not fount with id : "+ request.getRoadId()));
        Coordinate start = new Coordinate(request.getStartLongitude(),request.getStartLatitude());
        Coordinate end = new Coordinate(request.getEndLongitude(),request.getEndLatitude());
        LineString lineString = geometryFactory.createLineString(new Coordinate[]{start,end});
        lineString.setSRID(4326);
        RoadSegment roadSegment = RoadSegment.builder()
                .road(road)
                .length(request.getLength())
                .segmentOrder(request.getSegmentOrder())
                .geometry(lineString)
                .demoData(request.getDemoData())
                .build();
        return roadSegmentRepository.save(roadSegment);
    }
    public List<RoadSegment> getAll(){
        return roadSegmentRepository.findAll();
    }
    public RoadSegment getById(Long id){
        return roadSegmentRepository.findById(id).orElseThrow(()-> new RuntimeException("Road Segment not fout with id : "+ id));
    }

    public List<RoadSegment> getByRoadId(Long id){
        return roadSegmentRepository.findByRoadIdOrderBySegmentOrder(id);
    }

    public RoadSegmentResponse convertToResponse(RoadSegment roadSegment){
        return new RoadSegmentResponse(
                roadSegment.getId(),
                roadSegment.getRoad().getId(),
                roadSegment.getLength(),
                roadSegment.getSegmentOrder(),
                roadSegment.getGeometry() != null
                        ? roadSegment.getGeometry().toText()
                        : null,
                roadSegment.getDemoData()
        );

    }
}
