package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Catchment;
import org.example.life_cycle_sih.Entity.DrainNode;
import org.example.life_cycle_sih.dto.request.CatchmentRequest;
import org.example.life_cycle_sih.dto.response.CatchmentResponse;
import org.example.life_cycle_sih.repository.CatchmentRepository;
import org.example.life_cycle_sih.repository.DrainNodeRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Coordinates;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatchmentService {

    private final CatchmentRepository catchmentRepository;

    private final DrainNodeRepository drainNodeRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    public Catchment create(CatchmentRequest request){
        DrainNode drainNode = drainNodeRepository.findById(request.getDrainNodeId()).orElseThrow(()->new RuntimeException("Drain node not found with id : " + request.getDrainNodeId()));
        Polygon polygon = createCellPolygon(request.getLatitude(),request.getLongitude(),request.getCellSize());
        polygon.setSRID(4326);
        Catchment catchment = Catchment.builder()
                .name(request.getName())
                .area(request.getArea())
                .demoData(request.getDemoData())
                .geometry(polygon)
                .drainNode(drainNode)
                .build();
        return catchmentRepository.save(catchment);
    }

    public List<Catchment> getAll(){
        return catchmentRepository.findAll();
    }
    public Catchment getById(Long id){
        return catchmentRepository.findById(id).orElseThrow(()-> new RuntimeException("Catchment not found with id : " + id));
    }
    public CatchmentResponse convertToResponse(Catchment catchment){
        return new CatchmentResponse(
                catchment.getId(),
                catchment.getName(),
                catchment.getArea(),
                catchment.getGeometry().toText(),
                catchment.getDrainNode().getId(),
                catchment.getDemoData()
        );
    }

    public Polygon createCellPolygon(Double latitude,Double longitude,Double cellSize){
        double degreeSize = cellSize/111000.0;
        Coordinate[] coordinates = {new Coordinate(longitude,latitude),new Coordinate(longitude+degreeSize,latitude),new Coordinate(longitude,latitude+degreeSize),new Coordinate(longitude,latitude)};
        return geometryFactory.createPolygon(coordinates);
    }

}
