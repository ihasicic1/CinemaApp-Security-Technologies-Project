import type { Pageable } from "../utils/pageable";

export enum PGRating {
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  R = "R",
}

export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  duration: number;
  startDate: Date;
  endDate: Date;
  language: string;
  pgRating: PGRating;
  director: string;
  screenings: Screening[];
  movieGenres: {
    id: string;
    genre: Genre;
  }[];
  photos: Photo[];
  trailerUrl: string;
  movieWriters: {
    id: string;
    writer: Writer;
  }[];
  roles: {
    id: string;
    name: string;
    actor: Actor;
  }[];
};

export type Writer = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Actor = {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
};

export type Photo = {
  id: string;
  url: string;
  isCoverImage: boolean;
};

export type Venue = {
  id: string;
  name: string;
  street: string;
  imageUrl: string;
  location: Location;
};

export type Genre = {
  id: string;
  name: string;
};

export type Screening = {
  id: string;
  hall: Hall;
  startTime: Date;
};

export type Hall = {
  id: string;
  name: string;
  venue: Venue;
};

export type Location = {
  id: string;
  city: string;
  country: string;
};

export type MovieFilters = {
  title?: string;
  genres?: string[];
  city?: string;
  cinema?: string;
  projectionTime?: string;
  date?: string;
};

export type MovieFiltersWithPageable = MovieFilters & Pageable;

export type User = {
  id: string;
  email: string;
};

export type AuthFormErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};
