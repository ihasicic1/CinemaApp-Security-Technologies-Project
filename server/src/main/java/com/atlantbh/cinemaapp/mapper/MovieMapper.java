package com.atlantbh.cinemaapp.mapper;

import com.atlantbh.cinemaapp.dto.request.MovieRequest;
import com.atlantbh.cinemaapp.dto.response.MovieResponse;
import com.atlantbh.cinemaapp.entity.Movie;
import org.springframework.stereotype.Component;

@Component
public class MovieMapper {

    public Movie dtoToEntity(MovieRequest movieRequest) {
        Movie movie = new Movie();
        movie.setTitle(movieRequest.getTitle());
        movie.setDuration(movieRequest.getDuration());
        movie.setPgRating(movieRequest.getPgRating());
        movie.setLanguage(movieRequest.getLanguage());
        movie.setDirector(movieRequest.getDirector());
        movie.setTrailerUrl(movieRequest.getTrailerUrl());
        return movie;
    }

    public void updateEntity(Movie movie, MovieRequest movieRequest) {
        movie.setTitle(movieRequest.getTitle());
        movie.setDuration(movieRequest.getDuration());
        movie.setPgRating(movieRequest.getPgRating());
        movie.setLanguage(movieRequest.getLanguage());
        movie.setDirector(movieRequest.getDirector());
        movie.setTrailerUrl(movieRequest.getTrailerUrl());
    }

    public MovieResponse entityToDto(Movie movie) {
        MovieResponse movieResponse = new MovieResponse();
        movieResponse.setId(movie.getId());
        movieResponse.setTitle(movie.getTitle());
        movieResponse.setDuration(movie.getDuration());
        movieResponse.setPgRating(movie.getPgRating());
        movieResponse.setLanguage(movie.getLanguage());
        movieResponse.setDirector(movie.getDirector());
        movieResponse.setTrailerUrl(movie.getTrailerUrl());
        return movieResponse;
    }
}
