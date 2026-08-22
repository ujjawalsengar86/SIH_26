package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainEdge;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.example.life_cycle_sih.dto.request.DrainEdgeRequest;
//import org.example.life_cycle_sih.dto.response.DrainNodeResponse;
import org.example.life_cycle_sih.dto.response.DrainEdgeResponse;
import org.example.life_cycle_sih.repository.DrainEdgeRepository;
import org.example.life_cycle_sih.repository.DrainNodeRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.LineString;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrainEdgeService {

    private final DrainEdgeRepository drainEdgeRepository;
    private final DrainNodeRepository drainNodeRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public DrainEdge create(DrainEdgeRequest request){
        DrainNode fromNode = drainNodeRepository.findById(request.getFromNodeId()).orElseThrow(()-> new RuntimeException("From node not found with id : " + request.getFromNodeId()));
        DrainNode toNode = drainNodeRepository.findById(request.getToNodeId()).orElseThrow(()->new RuntimeException("to node not found with id " + request.getToNodeId()));
        Coordinate start = new Coordinate(fromNode.getLongitude(),fromNode.getLatitude());
        Coordinate end = new Coordinate(toNode.getLongitude(),toNode.getLatitude());
        LineString lineString  = geometryFactory.createLineString(new Coordinate[]{start,end});
        lineString.setSRID(4326);
        DrainEdge drainEdge = DrainEdge.builder()
                .fromNode(fromNode)
                .toNode(toNode)
                .length(request.getLength())
                .diameter(request.getDiameter())
                .capacity(request.getCapacity())
                .edgeType(request.getEdgeType())
                .demoData(request.getDemoData())
                .geometry(lineString)
                .build();
        return drainEdgeRepository.save(drainEdge);
    }

    public List<DrainEdge> getAll(){
        return drainEdgeRepository.findAll();
    }
    public DrainEdge getById(Long id){
        return drainEdgeRepository.findById(id).orElseThrow(()-> new RuntimeException("Drain edge not found with id "+ id));
    }

    public DrainEdgeResponse convertToResponse(DrainEdge drainEdge){
        return new DrainEdgeResponse(
                drainEdge.getId(),
                drainEdge.getFromNode().getId(),
                drainEdge.getToNode().getId(),
                drainEdge.getLength(),
                drainEdge.getDiameter(),
                drainEdge.getCapacity(),
                drainEdge.getEdgeType(),
                drainEdge.getGeometry().toText(),
                drainEdge.getDemoData()
        );
    }
}
