package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.entity.Movie;
import com.atlantbh.cinemaapp.service.MovieService;
import com.atlantbh.cinemaapp.util.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(final MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/currently-showing")
    public ResponseEntity<Page<Movie>> getCurrentlyShowing(@RequestParam(required = false) final String title,
                                                           @RequestParam(required = false) final List<String> genres,
                                                           @RequestParam(required = false) final String city,
                                                           @RequestParam(required = false) final String cinema,
                                                           @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
                                                               final LocalDateTime projectionTime,
                                                           @RequestParam(required = false) final LocalDate date,
                                                           @ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(movieService.getCurrentlyShowingMovies(title,
                genres,
                city,
                cinema,
                projectionTime,
                date,
                pagination.toPageable()));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<Page<Movie>> getUpcoming(@RequestParam(required = false) final String title,
                                                   @RequestParam(required = false) final List<String> genres,
                                                   @RequestParam(required = false) final String city,
                                                   @RequestParam(required = false) final String cinema,
                                                   @ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(movieService.getUpcomingMovies(title,
                genres,
                city,
                cinema,
                pagination.toPageable()));
    }

    @GetMapping("/latest")
    public ResponseEntity<Page<Movie>> getLatest(@RequestParam(defaultValue = "3") final Integer size) {
        return ResponseEntity.ok(movieService.getLatestMovies(size));
    }
}
