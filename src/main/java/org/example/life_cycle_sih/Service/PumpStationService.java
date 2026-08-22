package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.PumpStation;
import org.example.life_cycle_sih.dto.request.PumpStationRequest;
import org.example.life_cycle_sih.dto.response.PumpStationResponse;
import org.example.life_cycle_sih.repository.PumpStationRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PumpStationService {

    private final PumpStationRepository pumpStationRepository;

    private final GeometryFactory geometryFactory = new GeometryFactory();

    public PumpStation create(PumpStationRequest request){
        Point point = geometryFactory.createPoint(new Coordinate(request.getLongitude(),request.getLatitude()));
        point.setSRID(4326);
        PumpStation pumpStation = PumpStation.builder()
                .name(request.getName())
                .capacity(request.getCapacity())
                .pumpCount(request.getPumpCount())
                .operational(request.getOperational())
                .demoData(request.getDemoData())
                .location(point)
                .build();
        return pumpStationRepository.save(pumpStation);
    }
    public List<PumpStation> getAll(){
        return pumpStationRepository.findAll();
    }
    public PumpStation getById(Long id){
        return pumpStationRepository.findById(id).orElseThrow(()-> new RuntimeException("Pump station not found with id : " + id));
    }

    public PumpStationResponse convertToResponse(PumpStation pumpStation){
        return new PumpStationResponse(
                pumpStation.getId(),
                pumpStation.getName(),
                pumpStation.getCapacity(),
                pumpStation.getPumpCount(),
                pumpStation.getOperational(),
                pumpStation.getLocation()!=null?pumpStation.getLocation().toText():null,
                pumpStation.getDemoData()
        );
    }
}
