package com.atlantbh.cinemaapp.dto.request;

public record ChangePasswordRequest(
        String oldPassword,
        String newPassword
) {}
