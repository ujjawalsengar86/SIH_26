package org.example.life_cycle_sih.Service;

import lombok.AllArgsConstructor;
import org.example.life_cycle_sih.Entity.Outfall;
import org.example.life_cycle_sih.dto.request.OutfallRequest;
import org.example.life_cycle_sih.dto.response.OutfallResponse;
import org.example.life_cycle_sih.repository.OutfallRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class OutfallService {
    private final OutfallRepository outfallRepository;
    private final GeometryFactory geometryFactory = new GeometryFactory();

    public Outfall create(OutfallRequest request){
        Point point = geometryFactory.createPoint(new Coordinate(request.getLongitude(),request.getLatitude()));
        point.setSRID(4326);
        Outfall outfall = Outfall.builder()
                .name(request.getName())
                .waterBody(request.getWaterBody())
                .capacity(request.getCapacity())
                .operational(request.getOperational())
                .demoData(request.getDemoData())
                .location(point)
                .build();
        return outfallRepository.save(outfall);
    }
    public List<Outfall> getAll(){
        return outfallRepository.findAll();
    }
    public Outfall getById(Long id){
        return outfallRepository.findById(id).orElseThrow(()-> new RuntimeException("Outfall not found with id : " + id));

    }
    public OutfallResponse convertToResponse(Outfall outfall) {

        return new OutfallResponse(
                outfall.getId(),
                outfall.getName(),
                outfall.getWaterBody(),
                outfall.getCapacity(),
                outfall.getOperational(),
                outfall.getLocation() != null
                        ? outfall.getLocation().toText()
                        : null,
                outfall.getDemoData()
        );
    }
}
