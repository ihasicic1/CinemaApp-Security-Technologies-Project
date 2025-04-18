import * as React from "react";

import { getUpcomingMovies } from "../api";
import type { Movie } from "../api";
import type { Pageable } from "../utils";

type UpcomingResponse = {
  content: Movie[];
  totalElements: number;
};

export type UseUpcomingProps = Pageable;

export const useUpcomingMovies = ({
  page = 0,
  size = 4,
}: UseUpcomingProps = {}) => {
  const [data, setData] = React.useState<UpcomingResponse | null>(null);

  React.useEffect(() => {
    function fetchUpcomingMovies() {
      const pageable: Pageable = { page, size };
      getUpcomingMovies(pageable)
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
          console.error("Failed to fetch upcoming movies:", error);
        });
    }

    fetchUpcomingMovies();
  }, [page, size]);

  return { data };
};
