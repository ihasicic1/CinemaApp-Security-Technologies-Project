package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.entity.Movie;
import com.atlantbh.cinemaapp.service.MovieService;
import com.atlantbh.cinemaapp.util.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
                                                           @ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(movieService.getCurrentlyShowingMovies(title, genres, pagination.toPageable()));
    }

    @GetMapping("/upcoming")
    public ResponseEntity<Page<Movie>> getUpcoming(@RequestParam(required = false) final String title,
                                                   @RequestParam(required = false) final List<String> genres,
                                                   @ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(movieService.getUpcomingMovies(title, genres, pagination.toPageable()));
    }

    @GetMapping("/latest")
    public ResponseEntity<Page<Movie>> getLatest(@RequestParam(defaultValue = "3") final Integer size) {
        return ResponseEntity.ok(movieService.getLatestMovies(size));
    }
}
