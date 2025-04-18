export type Movie = {
  id: string;
  title: string;
  synopsis: string;
  duration: number;
  movieGenres: Array<{
    id: string;
    genre: Genre;
  }>;
  photos: Photo[];
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
};

export type Genre = {
  id: string;
  name: string;
};
