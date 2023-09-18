import { NextResponse } from "next/server";

export async function GET() {
  const apiURL = process.env.NEXT_PUBLIC_API_HOST || "";
  const response = await fetch(apiURL + "/get-genre-list");
  const data = await response.json();
  return NextResponse.json(data);
}
