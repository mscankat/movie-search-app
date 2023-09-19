import { dataType, movie, postType } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: postType = await req.json();
  const apiURL = new URL(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&watch_region=TR&language=en-US&page=1&sort_by=popularity.desc&append_to_response=details"
  );
  let movies: movie[] = [];
  let genreArr: string[] = [];
  body.genres.forEach((genre) => genreArr.push(genre.id));
  if (body.genres.length > 0) {
    apiURL.searchParams.set("with_genres", genreArr.join("|"));
  }
  apiURL.searchParams.set(
    "primary_release_date.gte",
    Math.min(body.year[0], body.year[1]).toString()
  );
  apiURL.searchParams.set(
    "primary_release_date.lte",
    Math.max(body.year[0], body.year[1]).toString()
  );
  let platformArr: string[] = [];
  body.platforms.forEach((platform) => platformArr.push(platform.provider_id));
  if (body.platforms) {
    apiURL.searchParams.set("with_watch_providers", platformArr.join("|"));
  }
  const getData = async () => {
    try {
      console.log("fetching");
      const response = await fetch(apiURL, options);
      const data: dataType = await response.json();
      movies = data.results;
    } catch (e) {
      console.log("fetch error:", e);
    }
    const moviePromises = movies.map(async (movie) => {
      const creditURL = new URL(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`
      );
      const response = await fetch(creditURL, options);
      const data = await response.json();
      movie.director = data.crew.filter(({ job }: any) => job === "Director");
      movie.actors = [data.cast[0], data.cast[1], data.cast[2]];
      return movie;
    });

    await Promise.all(moviePromises);
  };
  await getData();

  return NextResponse.json({ movies });
}
