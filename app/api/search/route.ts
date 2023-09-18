import { movieRequest, postType } from "@/types/dataType";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: postType = await req.json();
  //   console.log(body);
  const apiURL = process.env.NEXT_PUBLIC_API_HOST || "";
  let movies;
  const dataToSend: movieRequest = {
    pageNumber: 1,
    pageSize: 20,
  };
  if (body.genres) {
    dataToSend.genreId = body.genres[0].genreId;
  }
  console.log(body.year);
  if (!Number.isNaN(parseInt(body.year))) {
    dataToSend.releaseYear = body.year.toString();
  }
  if (body.platforms) {
    dataToSend.platformId = body.platforms[0].platformId;
  }
  console.log(dataToSend);
  const getData = async () => {
    try {
      console.log("fetching");
      const response = await fetch(apiURL + "/get-movie-list", {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      //   console.log(response);
      movies = await response.json();
      console.log(movies);
    } catch (e) {
      console.log("fetch error:", e);
    }
  };
  await getData();
  return NextResponse.json({ success: "true" });
}
