"use client";
import { genre, genreList } from "@/types/dataType";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Genre({
  genreList,
  setGenreList,
  selected,
  setSelected,
}: {
  genreList: genre[] | null;
  setGenreList: Dispatch<SetStateAction<genre[] | null>>;
  selected: genre[] | null;
  setSelected: Dispatch<SetStateAction<genre[]>>;
}) {
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(apiURL + "/api/genres");
        const genreData: genreList = await response.json();
        console.log(genreData);
        setGenreList(genreData.genres);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap w-[630px] justify-center">
        {genreList?.map((genre) => {
          return (
            <div
              key={genre.id}
              onClick={(e: React.MouseEvent) => {
                if (!selected?.includes(genre)) {
                  setSelected((previous) => {
                    return previous ? [...previous, genre] : [genre];
                  });
                } else {
                  setSelected(
                    (previous) =>
                      previous && previous.filter((val) => val !== genre)
                  );
                }
              }}
              className={`${
                selected?.includes(genre)
                  ? "bg-side-text-color text-white"
                  : "bg-white"
              } px-3 mx-1 my-1  rounded-full border border-black cursor-pointer transition-colors `}
            >
              {genre.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
