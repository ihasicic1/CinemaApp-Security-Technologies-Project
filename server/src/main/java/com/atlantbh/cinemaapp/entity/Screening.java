package com.atlantbh.cinemaapp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "screenings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Screening {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(unique = true, updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "movie_id", nullable = false)
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column
    @CreationTimestamp
    private Instant createdAt;

    @Column
    @UpdateTimestamp
    private Instant updatedAt;
}
