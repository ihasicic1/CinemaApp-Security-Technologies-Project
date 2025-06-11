package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.entity.Location;
import com.atlantbh.cinemaapp.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(final LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() { return locationRepository.findAll(); }
}
