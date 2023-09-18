"use client";
import { genre, genreList } from "@/types/dataType";
import { useEffect, useState } from "react";

export default function Genre() {
  const [genreList, setGenreList] = useState<genre[] | null>(null);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(apiURL + "/api/genres");
        const genreData: genreList = await response.json();
        setGenreList(genreData.data.genres);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  });
  return (
    <>
      <div>genres</div>
      {genreList?.map((genre) => {
        return <div>{genre.genreName}</div>;
      })}
    </>
  );
}
