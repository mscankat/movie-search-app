import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const url = new URL(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_API_KEY || "");
  let movies: movie[] = [];
  const getData = async () => {
    console.log(options);
    try {
      console.log("fetching");
      const response = await fetch(url, options);
      const data = await response.json();
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
  return NextResponse.json(movies);
}
