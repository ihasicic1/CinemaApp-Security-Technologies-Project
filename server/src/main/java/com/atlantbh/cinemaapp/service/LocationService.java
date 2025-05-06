package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.entity.Location;
import com.atlantbh.cinemaapp.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public List<Location> getAllLocations() { return locationRepository.findAll(); }
}
