package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.dto.MovieRating;
import com.atlantbh.cinemaapp.dto.request.MovieRequest;
import com.atlantbh.cinemaapp.dto.response.MovieResponse;
import com.atlantbh.cinemaapp.entity.Movie;
import com.atlantbh.cinemaapp.entity.Screening;
import com.atlantbh.cinemaapp.service.MovieService;
import com.atlantbh.cinemaapp.service.ScreeningService;
import com.atlantbh.cinemaapp.util.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/movies")
public class MovieController {

    private final MovieService movieService;
    private final ScreeningService screeningService;

    public MovieController(final MovieService movieService, final ScreeningService screeningService) {
        this.movieService = movieService;
        this.screeningService = screeningService;
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable final UUID movieId) {
        return ResponseEntity.ok(movieService.getMovieById(movieId));
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

    @GetMapping("/{movieId}/similar")
    public ResponseEntity<Page<Movie>> getSimilarMovies(@PathVariable final UUID movieId,
                                                        @ModelAttribute final Pagination pagination) {

        return ResponseEntity.ok(movieService.getSimilarMovies(movieId, pagination.toPageable()));
    }

    @GetMapping("/{movieId}/ratings")
    public ResponseEntity<List<MovieRating>> getMovieRatings(@PathVariable final UUID movieId) {
        return ResponseEntity.ok(movieService.getMovieRatings(movieId));
    }

    @GetMapping("/movies/{movieId}/screenings")
    public ResponseEntity<List<Screening>> getScreeningsByMovieId(@PathVariable final UUID movieId) {
        return ResponseEntity.ok(screeningService.getScreeningsByMovieId(movieId));
    }

    @GetMapping
    public ResponseEntity<Page<Movie>> getAllMovies(@ModelAttribute final Pagination pagination) {
        return ResponseEntity.ok(movieService.getAllMovies(pagination.toPageable()));
    }

    @PostMapping
    public ResponseEntity<MovieResponse> createMovie(@RequestBody MovieRequest request) {
        return ResponseEntity.ok(movieService.createMovie(request));
    }

    @PutMapping("/{movieId}")
    public ResponseEntity<MovieResponse> updateMovie(
            @PathVariable UUID movieId,
            @RequestBody MovieRequest request
    ) {
        return ResponseEntity.ok(movieService.updateMovie(movieId, request));
    }

    @DeleteMapping("/{movieId}")
    public ResponseEntity<Void> deleteMovie(@PathVariable UUID movieId) {
        movieService.deleteMovie(movieId);
        return ResponseEntity.noContent().build();
    }
}
