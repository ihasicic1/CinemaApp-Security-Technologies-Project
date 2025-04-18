package com.atlantbh.cinemaapp.util;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Getter
@Setter
public class Pagination {

    private final Integer page;
    private final Integer size;

    public Pagination(final Integer page, final Integer size) {
        this.page = page != null ? page : 0;
        this.size = size != null ? size : 50;
    }

    public Pageable toPageable() {
        return PageRequest.of(page, size);
    }
}
