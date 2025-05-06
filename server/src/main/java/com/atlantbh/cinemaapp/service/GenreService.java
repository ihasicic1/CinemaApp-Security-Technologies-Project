package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.entity.Genre;
import com.atlantbh.cinemaapp.repository.GenreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {
    private final GenreRepository genreRepository;

    public GenreService(final GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }
}
