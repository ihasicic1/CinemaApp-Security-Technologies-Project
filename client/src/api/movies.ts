import { axiosApp } from "./axiosApp";
import type { Movie } from "./types";
import type { Pageable, ResponseType } from "../utils";

export const getLatestMovies = async (): Promise<ResponseType<Movie>> => {
  const response = await axiosApp.get("/movies/latest");

  return response.data;
};

export const getCurrentlyShowingMovies = async (
  pageable: Pageable
): Promise<ResponseType<Movie>> => {
  const response = await axiosApp.get("/movies/currently-showing", {
    params: { ...pageable },
  });

  return response.data;
};

export const getUpcomingMovies = async (
  pageable: Pageable
): Promise<ResponseType<Movie>> => {
  const response = await axiosApp.get("/movies/upcoming", {
    params: { ...pageable },
  });

  return response.data;
};
