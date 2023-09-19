import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(typeof body);
  const url = new URL(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );
  url.searchParams.set("api_key", process.env.NEXT_PUBLIC_API_KEY || "");
  let movies;
  const getData = async () => {
    console.log(options);
    try {
      console.log("fetching");
      const response = await fetch(url, options);
      console.log(response);
      movies = await response.json();
      console.log(movies);
    } catch (e) {
      console.log("fetch error:", e);
    }
  };
  await getData();
  return NextResponse.json(movies);
}
