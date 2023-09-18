export interface movie {
  actors: actor[];
  descriptionContent: string;
  director: director;
  genres: string[];
  movieId: string;
  name: string;
  platforms: platform[];
  posterUrl: string;
  rating: number;
  releaseYear: string;
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
  data: {
    pageNumber: number;
    pageCount: number;
    totalRecord: number;
    movies: movie[];
  };
  statusCode: number;
  error: string;
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
