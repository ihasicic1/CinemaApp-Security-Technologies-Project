package com.atlantbh.cinemaapp.service;

import com.atlantbh.cinemaapp.config.JwtConfig;
import com.atlantbh.cinemaapp.dto.projection.UserProjection;
import com.atlantbh.cinemaapp.dto.request.AuthenticationRequestDto;
import com.atlantbh.cinemaapp.dto.request.RegistrationRequestDto;
import com.atlantbh.cinemaapp.dto.response.AuthenticationResponseDto;
import com.atlantbh.cinemaapp.dto.response.RegistrationResponseDto;
import com.atlantbh.cinemaapp.entity.RefreshToken;
import com.atlantbh.cinemaapp.entity.User;
import com.atlantbh.cinemaapp.exception.ValidationErrorException;
import com.atlantbh.cinemaapp.repository.RefreshTokenRepository;
import com.atlantbh.cinemaapp.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.GONE;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;
    private final AuthenticationManager authenticationManager;

    public UserService(final UserRepository userRepository,
                       final RefreshTokenRepository refreshTokenRepository,
                       final PasswordEncoder passwordEncoder,
                       final JwtService jwtService,
                       final JwtConfig jwtConfig,
                       final AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.jwtConfig = jwtConfig;
        this.authenticationManager = authenticationManager;
    }

    public UserProjection getProjectedUserByEmail(final String email) {
        return userRepository.findProjectedByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(GONE,
                        "The user with specified email does not exist"));
    }

    @Transactional
    public RegistrationResponseDto registerUser(final RegistrationRequestDto registrationRequestDto) {

        if (userRepository.existsByEmail(registrationRequestDto.getEmail())) {
            throw new ValidationErrorException(Map.of("email", "Email already exists"));
        }

        final User user = new User(registrationRequestDto.getEmail(),
                passwordEncoder.encode(registrationRequestDto.getPassword()));

        final User savedUser = userRepository.save(user);

        final String accessToken = jwtService.generateAccessToken(savedUser.getEmail());

        final RefreshToken refreshToken = new RefreshToken(savedUser, Instant.now().plus(jwtConfig.getRefreshTokenTtl()));
        refreshTokenRepository.save(refreshToken);

        return new RegistrationResponseDto(savedUser.getEmail(), accessToken, refreshToken.getId());
    }

    public AuthenticationResponseDto authenticate(final AuthenticationRequestDto request) {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(),
                        request.password())
        );

        final Duration refreshTokenTtl = jwtConfig.getRefreshTokenTtl();

        final String accessToken = jwtService.generateAccessToken(request.email());

        final User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                        "No user found with the provided email address"));

        final RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user);
        refreshToken.setExpiresAt(Instant.now().plus(refreshTokenTtl));
        final RefreshToken savedRefreshToken = refreshTokenRepository.save(refreshToken);

        return new AuthenticationResponseDto(accessToken, savedRefreshToken.getId());
    }

    public AuthenticationResponseDto refreshToken(final UUID refreshToken) {

        final RefreshToken refreshTokenEntity = refreshTokenRepository
                .findById(refreshToken)
                .orElseThrow(() -> new ResponseStatusException(
                        BAD_REQUEST, "Invalid or expired refresh token"));

        final String newAccessToken = jwtService.generateAccessToken(refreshTokenEntity.getUser().getEmail());

        return new AuthenticationResponseDto(newAccessToken, refreshToken);
    }

    public void revokeRefreshToken(final UUID refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }
}
