"use client";
import { useState } from "react";
import Genre from "./Genre";
import Platform from "./Platform";
import ReleaseYear from "./ReleaseYear";
import { genre, platform, postType } from "@/types/dataType";

export default function Navbar() {
  const [value, setValue] = useState<string>("-");
  const [checked, setChecked] = useState(new Array(3).fill(false));
  const [platformList, setPlatformList] = useState<platform[] | null>(null);
  const [genreList, setGenreList] = useState<genre[] | null>(null);
  const [selected, setSelected] = useState<genre[] | null>(null);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    let selectedPlatforms: platform[] | null = null;
    platformList?.forEach((platform, index) => {
      if (checked[index]) {
        selectedPlatforms
          ? selectedPlatforms.push(platform)
          : (selectedPlatforms = [platform]);
      }
    });
    console.log(typeof value);
    const dataToSend: postType = {
      year: value,
      genres: selected,
      platforms: selectedPlatforms,
    };
    fetch(apiURL + "/api/search", {
      method: "POST",
      body: JSON.stringify(dataToSend),
    });
  };
  return (
    <>
      <div>home</div>
      <nav className="flex justify-evenly p-3 border-b h-72 items-center">
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
        <button
          onClick={handleSubmit}
          className="bg-green-300 w-32 h-12 rounded-md"
        >
          search
        </button>

        <div></div>
      </nav>
    </>
  );
}
