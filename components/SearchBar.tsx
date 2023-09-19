"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Genre from "./Genre";
import Platform from "./Platform";
import ReleaseYear from "./ReleaseYear";
import { genre, movie, platform, postType } from "@/types/dataType";

export default function SearchBar({
  setData,
  setIsLoading,
}: {
  setData: Dispatch<SetStateAction<movie[] | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState<number[]>([1990, 2023]);
  const [checked, setChecked] = useState(new Array(7).fill(false));
  const [platformList, setPlatformList] = useState<platform[]>([]);
  const [genreList, setGenreList] = useState<genre[] | null>(null);
  const [selected, setSelected] = useState<genre[]>([]);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";

  const handleSubmit = (e: React.MouseEvent) => {
    setIsLoading(true);
    e.preventDefault();
    let selectedPlatforms: platform[] = [];
    platformList?.forEach((platform, index) => {
      if (checked[index]) {
        selectedPlatforms
          ? selectedPlatforms.push(platform)
          : (selectedPlatforms = [platform]);
      }
    });
    const dataToSend: postType = {
      pageNumber: 1,
      pageCount: 20,
      year: value,
      genres: selected || null,
      platforms: selectedPlatforms,
    };
    fetch(apiURL + "/api/search", {
      method: "POST",
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.movies);
        setData(data.movies);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div></div>
      <div className="flex justify-evenly p-3 border-b h-72 items-center bg-side-light-second">
        <ReleaseYear value={value} setValue={setValue} />

        <Genre
          genreList={genreList}
          setGenreList={setGenreList}
          selected={selected}
          setSelected={setSelected}
        />
        <Platform
          checked={checked}
          setChecked={setChecked}
          platformList={platformList}
          setPlatformList={setPlatformList}
        />
        <button onClick={handleSubmit} className="bg-purp w-32 h-12 rounded-md">
          search
        </button>
      </div>
    </>
  );
}
