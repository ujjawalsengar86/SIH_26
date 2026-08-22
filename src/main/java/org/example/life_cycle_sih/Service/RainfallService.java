package org.example.life_cycle_sih.Service;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.RainfallData;
import org.example.life_cycle_sih.repository.RainFallDataRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RainfallService {

    private final RainFallDataRepository rainFallDataRepository;

    public RainfallData save(RainfallData rainfallData){
        return rainFallDataRepository.save(rainfallData);
    }

    public List<RainfallData> getAll(){
        return rainFallDataRepository.findAll();
    }
    public List<RainfallData> getForecast(){
        return rainFallDataRepository.findByForecast(true);
    }

    public List<RainfallData> getCurrentRainfall(){
        return rainFallDataRepository.findByForecast(true);
    }

    public List<RainfallData> getRainfallBetween(LocalDateTime start,LocalDateTime end){
        return rainFallDataRepository.findByTimestampBetween(start,end);
    }



}
