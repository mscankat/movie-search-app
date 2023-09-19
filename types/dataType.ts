export interface movie {
  overview: string;
  genre_ids: number[];
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  actors: actor[];
  director: actor[];
  job?: string;
}
export interface actor {
  id: number;
  name: string;
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
  id: number;
  name: string;
}
export interface director {
  directorId: string;
  directorName: string;
}

export interface platform {
  provider_id: string;
  logo_path: string;
  provider_name: string;
}

export interface dataType {
  page: number;
  results: movie[];
}

export interface genreList {
  genres: genre[];
}
export interface platformList {
  results: platform[];
}

export interface postType {
  pageNumber: number;
  pageCount: number;
  year: number[];
  genres: genre[];
  platforms: platform[];
}
