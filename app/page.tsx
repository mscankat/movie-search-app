"use client";
import List from "@/components/List";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState();
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";
  useEffect(() => {
    console.log("asdsad");
    const getData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(apiURL + "/api", {
          method: "POST",
          body: JSON.stringify({
            pageNumber: 1,
            pageSize: 0,
            // movieId: "string",
            // releaseYear: "string",
            // genreId: "string",
            // directorId: "string",
            // actorId: "string",
            // platformId: "string",
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "*",
          },
        });
        const movies = await response.json();
        console.log(movies);
        setData(movies.data.movies);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <div className="p-16 text-5xl">Results</div>
      <div className="flex flex-wrap px-28 gap-20 justify-center">
        <List data={data} />
      </div>
    </>
  );
}
