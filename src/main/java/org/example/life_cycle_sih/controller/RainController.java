package org.example.life_cycle_sih.controller;

import lombok.RequiredArgsConstructor;
import org.example.life_cycle_sih.Entity.RainfallData;
import org.example.life_cycle_sih.Service.RainfallService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/rainfall")
@RequiredArgsConstructor
public class RainController {

    private final RainfallService rainfallService;

    @PostMapping
    public ResponseEntity<RainfallData> save(@RequestBody RainfallData rainfallData){
        return ResponseEntity.status(HttpStatus.CREATED).body(rainfallService.save(rainfallData));
    }
    @GetMapping
    public ResponseEntity<List<RainfallData>> getAll(){
        return ResponseEntity.ok(rainfallService.getAll());
    }
    @GetMapping("/current")
    public ResponseEntity<List<RainfallData>> getCurrent(){
        return ResponseEntity.ok(rainfallService.getCurrentRainfall());
    }

    @GetMapping("/forecast")
    public ResponseEntity<List<RainfallData>> getForecast(){
        return ResponseEntity.ok(rainfallService.getForecast());
    }
    @GetMapping("/between")
    public ResponseEntity<List<RainfallData>> getRainfallBetween(@RequestParam LocalDateTime start, @RequestParam LocalDateTime end){
        return ResponseEntity.ok(rainfallService.getRainfallBetween(start,end));
    }

}
