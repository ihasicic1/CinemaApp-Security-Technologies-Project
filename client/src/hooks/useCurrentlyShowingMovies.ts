import * as React from "react";

import { getCurrentlyShowingMovies } from "../api/movies";
import type { Movie } from "../api/types";
import type { Pageable } from "../utils";

type CurrentlyShowingResponse = {
  content: Movie[];
  totalElements: number;
};

export type UseCurrentlyShowingProps = Pageable;

export const useCurrentlyShowingMovies = ({
  page = 0,
  size = 4,
}: UseCurrentlyShowingProps = {}) => {
  const [data, setData] = React.useState<CurrentlyShowingResponse | null>(null);

  React.useEffect(() => {
    function fetchCurrentlyShowingMovies() {
      const pageable: Pageable = { page, size };
      getCurrentlyShowingMovies(pageable)
        .then((response) => {
          const formattedResponse = {
            content: response?.content || [],
            totalElements:
              response?.page?.totalElements ??
              Math.max((response?.content || []).length, (page + 1) * size),
          };
          setData(formattedResponse);
        })
        .catch((error) => {
          console.error("Failed to fetch currently showing movies:", error);
        });
    }

    fetchCurrentlyShowingMovies();
  }, [page, size]);

  return { data };
};
