package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.entity.Movie;
import com.atlantbh.cinemaapp.repository.MovieRepository;
import com.atlantbh.cinemaapp.specification.MovieSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(final MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Page<Movie> getCurrentlyShowingMovies(final String title,
                                                 final List<String> genres,
                                                 final String city,
                                                 final String cinema,
                                                 final LocalDateTime projectionTime,
                                                 final LocalDate date,
                                                 final Pageable pageable) {

        final Specification<Movie> specification = Specification.where(MovieSpecification.hasTitle(title))
                .and(MovieSpecification.hasGenres(genres))
                .and(MovieSpecification.hasCity(city))
                .and(MovieSpecification.hasCinema(cinema))
                .and(MovieSpecification.hasProjectionTime(projectionTime))
                .and(MovieSpecification.isShowingOnDate(date));

        return movieRepository.findAll(specification, pageable);
    }

    public Page<Movie> getUpcomingMovies(final String title,
                                         final List<String> genres,
                                         final String city,
                                         final String cinema,
                                         final Pageable pageable) {

        final Specification<Movie> specification = Specification.where(MovieSpecification.hasTitle(title))
                .and(MovieSpecification.hasGenres(genres))
                .and(MovieSpecification.hasCity(city))
                .and(MovieSpecification.hasCinema(cinema))
                .and(MovieSpecification.isUpcoming());

        return movieRepository.findAll(specification, pageable);
    }

    public Page<Movie> getLatestMovies(final Integer size) {
        Specification<Movie> specification = MovieSpecification.isShowingOnDate(null);

        final Pageable pageable = PageRequest.of(0, size, Sort.by("startDate").descending());

        return movieRepository.findAll(specification, pageable);
    }
}
