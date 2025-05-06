package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.entity.Venue;
import com.atlantbh.cinemaapp.service.VenueService;
import com.atlantbh.cinemaapp.util.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/venues")
public class VenueController {
    private final VenueService venueService;

    public VenueController(final VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping("/all")
    public List<Venue> getAllVenues() { return venueService.getAllVenues(); }

    @GetMapping
    public ResponseEntity<Page<Venue>> getVenues(@ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(venueService.getVenues(pagination.toPageable()));
    }
}
