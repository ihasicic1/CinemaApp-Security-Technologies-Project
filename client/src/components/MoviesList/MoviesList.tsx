import { Card } from "../Card";
import type { Movie } from "../../api/types";
import { Showtimes } from "../Showtimes";
import { Badge } from "antd";
import { MovieRatingLabels, getReleaseDateText } from "../../utils";

import "./moviesList.scss";

export type MoviesListProps = {
  movies?: Movie[];
  selectedDate?: string;
  listLayout?: "currentlyShowing" | "upcoming";
  cardLayout?: "horizontal" | "vertical";
};

export const MoviesList = ({
  movies,
  selectedDate,
  listLayout = "currentlyShowing",
  cardLayout = "vertical",
}: MoviesListProps) => {
  return (
    <div className={`movies-list-container ${listLayout}`}>
      {movies?.map((movie) => {
        const coverPhoto =
          movie.photos.find((photo) => photo.isCoverImage) || movie.photos[0];

        // Different description content based on layout
        let descriptionContent;
        let extraContent;

        if (listLayout === "currentlyShowing") {
          // Description for Currently Showing
          descriptionContent = (
            <div className="card-horizontal-description">
              <div className="card-rating-language-duration">
                <div className="card-pg-rating">
                  {MovieRatingLabels[movie.pgRating] ?? movie.pgRating}
                </div>
                <span className="separator">|</span>
                <div className="card-language">{movie.language}</div>
                <span className="separator">|</span>
                <div className="card-duration">{movie.duration} Min</div>
              </div>
              <div className="card-genres">
                {movie.movieGenres.map((genre) => (
                  <div key={genre.id} className="card-genre">
                    {genre.genre.name}
                  </div>
                ))}
              </div>
            </div>
          );
          // Showtimes for Currently Showing
          // Filter screenings only for currentlyShowing layout
          const filteredScreenings =
            listLayout === "currentlyShowing" && selectedDate
              ? movie.screenings.filter((screening) => {
                  const screeningDate = new Date(screening.startTime);
                  const dateString = screeningDate.toISOString().split("T")[0];
                  return dateString === selectedDate;
                })
              : movie.screenings;
          extraContent = (
            <div className="card-showtimes">
              <Showtimes showtimes={filteredScreenings} />
            </div>
          );
        } else {
          // Description for Upcoming
          descriptionContent = (
            <div className="card-duration-genre">
              <p className="card-duration">{movie.duration} MIN</p>
              <p className="separator">|</p>
              <p className="card-genre">{movie.movieGenres[0].genre.name}</p>
            </div>
          );
        }

        if (listLayout === "upcoming") {
          const releaseDateText = getReleaseDateText(movie.startDate);
          return (
            <Badge.Ribbon
              text={releaseDateText}
              color="#B22222"
              className="movie-ribbon-badge"
              key={movie.id}
            >
              <Card
                photoUrl={coverPhoto.url}
                title={movie.title}
                description={descriptionContent}
                extra={extraContent}
                layout={cardLayout}
              />
            </Badge.Ribbon>
          );
        }

        return (
          <Card
            key={movie.id}
            photoUrl={coverPhoto.url}
            title={movie.title}
            description={descriptionContent}
            extra={extraContent}
            layout={cardLayout}
          />
        );
      })}
    </div>
  );
};
