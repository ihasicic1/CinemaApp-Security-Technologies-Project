import { Venue } from "./types";
import { axiosApp } from "./axiosApp";
import type { Pageable, ResponseType } from "../utils";

export const getVenues = async (
  pageable: Pageable
): Promise<ResponseType<Venue>> => {
  const response = await axiosApp.get("/venues", {
    params: { ...pageable },
  });

  return response.data;
};
