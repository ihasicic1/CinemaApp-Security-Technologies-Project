package com.atlantbh.cinemaapp.controller;

import com.atlantbh.cinemaapp.dto.projection.UserProjection;
import com.atlantbh.cinemaapp.dto.request.AuthenticationRequestDto;
import com.atlantbh.cinemaapp.dto.request.PasswordResetRequest;
import com.atlantbh.cinemaapp.dto.request.RegistrationRequestDto;
import com.atlantbh.cinemaapp.dto.request.ResetPasswordRequest;
import com.atlantbh.cinemaapp.entity.ResetToken;
import com.atlantbh.cinemaapp.entity.User;
import com.atlantbh.cinemaapp.dto.request.UserRequest;
import com.atlantbh.cinemaapp.dto.response.AuthenticationResponseDto;
import com.atlantbh.cinemaapp.dto.response.RegistrationResponseDto;
import com.atlantbh.cinemaapp.dto.response.UserResponse;
import com.atlantbh.cinemaapp.service.UserService;
import com.atlantbh.cinemaapp.util.Pagination;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthenticationResponseDto> authenticate(@RequestBody final AuthenticationRequestDto authenticationRequestDto) {

        return ResponseEntity.ok(userService.authenticate(authenticationRequestDto));
    }

    @PostMapping("/auth/register")
    public ResponseEntity<RegistrationResponseDto> registerUser(@Valid @RequestBody final RegistrationRequestDto registrationDTO) {

        final RegistrationResponseDto response = userService.registerUser(registrationDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/refresh-token")
    public ResponseEntity<AuthenticationResponseDto> refreshToken(@RequestBody final Map<String, String> request) {

        final UUID refreshToken = UUID.fromString(request.get("refreshToken"));
        final AuthenticationResponseDto response = userService.refreshToken(refreshToken);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<Void> logout(@RequestBody final Map<String, String> request) {

        final UUID refreshToken = UUID.fromString(request.get("refreshToken"));
        userService.revokeRefreshToken(refreshToken);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/me")
    public ResponseEntity<UserProjection> getUserProfile(final Authentication authentication) {

        return ResponseEntity.ok(userService.getProjectedUserByEmail(authentication.getName()));
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<String> requestReset(@RequestBody final PasswordResetRequest request) {
        userService.processPasswordResetRequest(request.getEmail());
        return ResponseEntity.ok("If the email is registered, you'll get a reset link");
    }

    @GetMapping("/auth/reset-password")
    public ResponseEntity<String> validateToken(@RequestParam("token") final String token) {
        try {
            final String result = userService.validateToken(token);
            return ResponseEntity.ok(result);
        } catch (final IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/auth/reset-password/confirm")
    public ResponseEntity<String> resetPassword(@RequestBody final ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.getToken(), request.getNewPassword());
            return ResponseEntity.ok("Password updated");
        } catch (final IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/users")
    public ResponseEntity<Page<UserResponse>> getAllUsers(
            @ModelAttribute Pagination pagination
    ) {
        return ResponseEntity.ok(
                userService.getAllUsers(pagination.toPageable())
        );
    }

    @PostMapping("/users")
    public ResponseEntity<UserResponse> createUser(
            @RequestBody @Valid UserRequest request
    ) {
        return ResponseEntity.ok(userService.createUser(request));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
}
