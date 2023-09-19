import { options } from "@/utils/fetchOptions";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=TR",
    options
  );
  const data = await response.json();
  return NextResponse.json(data);
}
