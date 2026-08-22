package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.Terrain;
import org.example.life_cycle_sih.dto.request.TerrainRequest;
import org.example.life_cycle_sih.dto.response.TerrainResponse;
import org.example.life_cycle_sih.repository.TerrainRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Polygon;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TerrainService {

    private final TerrainRepository terrainRepository;

    private final GeometryFactory geometryFactory =
            new GeometryFactory();

    public Terrain create(TerrainRequest request) {

        Polygon polygon = createCellPolygon(
                request.getLatitude(),
                request.getLongitude(),
                request.getCellSize()
        );
        polygon.setSRID(4326);

        Terrain terrain = Terrain.builder()
                .elevation(request.getElevation())
                .cellSize(request.getCellSize())
                .geometry(polygon)
                .demoData(request.getDemoData())
                .build();
        return terrainRepository.save(terrain);
    }

    public List<Terrain> getAll() {
        return terrainRepository.findAll();
    }

    public Terrain getById(Long id) {
        return terrainRepository.findById(id).orElseThrow(() -> new RuntimeException("Terrain cell not found with id: " + id));
    }

    public TerrainResponse convertToResponse(Terrain terrain) {

        return new TerrainResponse(
                terrain.getId(),
                terrain.getElevation(),
                terrain.getCellSize(),
                terrain.getGeometry().toText(),
                terrain.getDemoData()
        );
    }

    private Polygon createCellPolygon(
            double latitude,
            double longitude,
            double cellSize
    ) {

        double degreeSize = cellSize / 111000.0;

        Coordinate[] coordinates = {new Coordinate(longitude, latitude), new Coordinate(longitude + degreeSize, latitude), new Coordinate(longitude + degreeSize, latitude + degreeSize), new Coordinate(longitude, latitude + degreeSize),new Coordinate(longitude, latitude)
        };
        return geometryFactory.createPolygon(coordinates);
    }
}