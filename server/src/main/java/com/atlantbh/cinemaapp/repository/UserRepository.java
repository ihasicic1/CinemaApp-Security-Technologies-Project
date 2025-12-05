package com.atlantbh.cinemaapp.repository;

import com.atlantbh.cinemaapp.dto.projection.UserProjection;
import com.atlantbh.cinemaapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(final String email);

    Boolean existsByEmail(final String email);

    Optional<UserProjection> findProjectedByEmail(final String email);
}
