import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    options
  );
  const data = await response.json();
  console.log(data);
  return NextResponse.json(data);
}
