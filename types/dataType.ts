export interface movie {
  overview: string;
  genres: number[];
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  actor: string[];
  director: string;
}

export interface movieRequest {
  pageNumber: number;
  pageSize: number;
  movieId?: string;
  releaseYear?: string;
  genreId?: string;
  directorId?: string;
  actorId?: string;
  platformId?: string;
}

export interface actor {
  actorId: string;
  actorName: string;
}
export interface genre {
  genreId: string;
  genreName: string;
}
export interface director {
  directorId: string;
  directorName: string;
}

export interface platform {
  platformId: string;
  platformLogoUrl: string;
  platformName: string;
}

export interface dataType {
  page: number;
  results: movie[];
}

export interface genreList {
  data: {
    genres: genre[];
  };
}
export interface platformList {
  data: {
    platforms: platform[];
  };
}

export interface postType {
  pageNumber: number;
  pageCount: number;
  year: number[];
  genres: genre | null;
  platforms: platform | null;
}
