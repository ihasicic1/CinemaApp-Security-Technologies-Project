import * as React from "react";

import { Card } from "../../components";
import { Hero, HomepageSection } from "../../components";
import {
  useCurrentlyShowingMovies,
  useUpcomingMovies,
  useVenues,
} from "../../hooks";

import "./home.scss";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 4;

export const Home = () => {
  const [currentlyShowingMoviesPage, setCurrentlyShowingMoviesPage] =
    React.useState(DEFAULT_PAGE);
  const [upcomingMoviesPage, setUpcomingMoviesPage] =
    React.useState(DEFAULT_PAGE);
  const [venuesPage, setVenuesPage] = React.useState(DEFAULT_PAGE);

  const { data: currentlyShowing } = useCurrentlyShowingMovies({
    page: currentlyShowingMoviesPage,
    size: DEFAULT_SIZE,
  });

  const { data: upcoming } = useUpcomingMovies({
    page: upcomingMoviesPage,
    size: DEFAULT_SIZE,
  });

  const { data: venues } = useVenues({
    page: venuesPage,
    size: DEFAULT_SIZE,
  });

  return (
    <div className="homepage-container">
      <Hero />
      <div className="homepage-section-container">
        <HomepageSection
          title="Currently Showing"
          itemsPerPage={DEFAULT_SIZE}
          currentPage={currentlyShowingMoviesPage}
          totalElements={currentlyShowing?.totalElements ?? 0}
          onPageChange={setCurrentlyShowingMoviesPage}
          link="/currently-showing"
        >
          {currentlyShowing?.content?.map((movie) => {
            const coverPhoto =
              movie.photos.find((photo) => photo.isCoverImage) ||
              movie.photos[0];

            return (
              <Card
                key={movie.id}
                photoUrl={coverPhoto.url}
                title={movie.title}
                description={
                  <div className="card-duration-genre">
                    <p className="card-duration">{movie.duration} MIN</p>
                    <p className="separator">|</p>
                    <p className="card-genre">
                      {movie.movieGenres[0].genre.name}
                    </p>
                  </div>
                }
              />
            );
          })}
        </HomepageSection>

        <HomepageSection
          title="Upcoming Movies"
          itemsPerPage={DEFAULT_SIZE}
          currentPage={upcomingMoviesPage}
          totalElements={upcoming?.totalElements ?? 0}
          onPageChange={setUpcomingMoviesPage}
          link="/upcoming"
        >
          {upcoming?.content?.map((movie) => {
            const coverPhoto =
              movie.photos.find((photo) => photo.isCoverImage) ||
              movie.photos[0];

            return (
              <Card
                key={movie.id}
                photoUrl={coverPhoto.url}
                title={movie.title}
                description={
                  <div className="card-duration-genre">
                    <p className="card-duration">{movie.duration} MIN</p>
                    <p className="separator">|</p>
                    <p className="card-genre">
                      {movie.movieGenres[0].genre.name}
                    </p>
                  </div>
                }
              />
            );
          })}
        </HomepageSection>

        <HomepageSection
          title="Venues"
          itemsPerPage={DEFAULT_SIZE}
          currentPage={venuesPage}
          totalElements={venues?.totalElements ?? 0}
          onPageChange={setVenuesPage}
        >
          {venues?.content?.map((venue) => (
            <Card
              key={venue.id}
              photoUrl={venue.imageUrl}
              title={venue.name}
              description={<p className="venue-street">{venue.street}</p>}
            />
          ))}
        </HomepageSection>
      </div>
    </div>
  );
};
