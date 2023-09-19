import { dataType, movie, postType } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: postType = await req.json();
  const apiURL = new URL(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&append_to_response=details"
  );
  let movies: movie[] = [];

  if (body.genres) {
    apiURL.searchParams.set("with_genres", body.genres.name);
  }
  // console.log(body.year);
  apiURL.searchParams.set(
    "primary_release_date.gte",
    Math.min(body.year[0], body.year[1]).toString()
  );
  apiURL.searchParams.set(
    "primary_release_date.lte",
    Math.max(body.year[0], body.year[1]).toString()
  );
  if (body.platforms) {
    apiURL.searchParams.set(
      "with_watch_providers",
      body.platforms.platformName
    );
  }
  // console.log(apiURL);
  const getData = async () => {
    try {
      console.log("fetching");
      const response = await fetch(apiURL, options);
      const data: dataType = await response.json();
      movies = data.results;
      // console.log(movies);
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
      return movie; // Return the modified movie object
    });

    // Wait for all promises to resolve using Promise.all
    await Promise.all(moviePromises);
  };
  await getData();
  // console.log(typeof movies);

  return NextResponse.json({ movies });
}
