package com.atlantbh.cinemaapp.dto.projection;

import com.atlantbh.cinemaapp.entity.SystemRole;

import java.util.UUID;

public interface UserProjection {
    public UUID getId();
    public String getEmail();
    public SystemRole getRole();
}
