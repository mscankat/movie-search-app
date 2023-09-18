import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(typeof body);
  const apiURL = process.env.NEXT_PUBLIC_API_HOST || "";
  let movies;
  const getData = async () => {
    try {
      console.log("fetching");
      const response = await fetch(apiURL + "/get-movie-list", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
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
