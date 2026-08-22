package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.example.life_cycle_sih.dto.response.DrainNodeResponse;
import org.example.life_cycle_sih.repository.DrainNodeRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DrainageService {

    private final DrainNodeRepository drainNodeRepository;

    private final GeometryFactory geometryFactory =
            new GeometryFactory();

    public DrainNode addNode(DrainNode request) {

        Point point = geometryFactory.createPoint(new Coordinate(request.getLongitude(), request.getLatitude()));

        point.setSRID(4326);
        DrainNode drainNode = DrainNode.builder()
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .elevation(request.getElevation())
                .capacity(request.getCapacity())
                .nodeType(request.getNodeType())
                .location(point)
                .build();
        return drainNodeRepository.save(drainNode);
    }

    public List<DrainNode> getAll() {
        return drainNodeRepository.findAll();
    }

    public DrainNode getById(Long id) {
        return drainNodeRepository.findById(id).orElseThrow(() -> new RuntimeException("Drain Node not found with id : " + id));
    }
    public DrainNodeResponse convertToResponse(DrainNode drainNode) {
        return new DrainNodeResponse(
                drainNode.getId(),
                drainNode.getLatitude(),
                drainNode.getLongitude(),
                drainNode.getElevation(),
                drainNode.getCapacity(),
                drainNode.getNodeType(),
                drainNode.getLocation() != null ? drainNode.getLocation().toText() : null
        );
    }
}