package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.LandUse;
import org.example.life_cycle_sih.dto.request.LandUseRequest;
import org.example.life_cycle_sih.dto.response.LandUseResponse;
import org.example.life_cycle_sih.repository.LandUseRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class LandUseService {
    private final LandUseRepository landUseRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    public LandUse create(LandUseRequest request){
        Polygon polygon = createCellPolygon(
                request.getLatitude(),
                request.getLongitude(),
                request.getCellSize()
        );
        polygon.setSRID(4326);
        LandUse landUse = LandUse.builder()
                .landType(request.getLandType())
                .runoffCoefficient(request.getRunoffCoefficient())
                .cellSize(request.getCellSize())
                .geometry(polygon)
                .demoData(request.getDemoData())
                .build();
        return landUseRepository.save(landUse);
    }

    public List<LandUse> getAll(){
        return landUseRepository.findAll();
    }

    public LandUse getById(Long id){
        return landUseRepository.findById(id).orElseThrow(()-> new RuntimeException("Land use cell not found with id : " + id));
    }
    private Polygon createCellPolygon(double latitude,double longitude,double cellSize){
        double degreeSize = cellSize/111000.0;

        Coordinate[] coordinates = {new Coordinate(longitude,latitude),new Coordinate(longitude+degreeSize,latitude),new Coordinate(longitude+degreeSize,latitude+degreeSize),new Coordinate(longitude,latitude+degreeSize),new Coordinate(longitude,latitude)};
        return geometryFactory.createPolygon(coordinates);
    }

    public LandUseResponse convertToResponse(LandUse landUse) {

        return new LandUseResponse(
                landUse.getId(),
                landUse.getLandType(),
                landUse.getRunoffCoefficient(),
                landUse.getCellSize(),
                landUse.getGeometry().toText(),
                landUse.getDemoData()
        );
    }
}

