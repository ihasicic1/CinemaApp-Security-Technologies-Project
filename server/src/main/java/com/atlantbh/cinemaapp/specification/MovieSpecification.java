package com.atlantbh.cinemaapp.specification;

import com.atlantbh.cinemaapp.entity.Movie;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.List;

public class MovieSpecification {

    public static Specification<Movie> hasTitle(final String title) {
        return (root, query, criteriaBuilder) -> {

            if(title == null || title.isEmpty()){
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(root.get("title"), title);
        };
    }

    public static Specification<Movie> isShowingToday() {
        return (root, query, criteriaBuilder) -> {
            final LocalDate today = LocalDate.now();

            return criteriaBuilder.and(
                    criteriaBuilder.lessThanOrEqualTo(root.get("startDate"), today),
                    criteriaBuilder.greaterThanOrEqualTo(root.get("endDate"), today)
            );
        };
    }

    public static Specification<Movie> isUpcoming() {
        return (root, query, criteriaBuilder) -> {
            final LocalDate today = LocalDate.now();

            return criteriaBuilder.greaterThan(root.get("startDate"), today);
        };
    }
}

