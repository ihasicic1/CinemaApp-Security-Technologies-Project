package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.entity.Venue;
import com.atlantbh.cinemaapp.repository.VenueRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {
    private final VenueRepository venueRepository;

    public VenueService(final VenueRepository venueRepository) {
        this.venueRepository = venueRepository;
    }

    public List<Venue> getAllVenues() { return venueRepository.findAll(); }

    public Page<Venue> getVenues(final Pageable pageable) {
        return venueRepository.findAll(pageable);
    }
}
