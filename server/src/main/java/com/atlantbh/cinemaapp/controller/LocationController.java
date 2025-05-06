package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.entity.Location;
import com.atlantbh.cinemaapp.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("/all")
    public List<Location> getAllLocations() { return locationService.getAllLocations(); }
}
