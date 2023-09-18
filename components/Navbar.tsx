"use client";
import { useState } from "react";
import Genre from "./Genre";
import Platform from "./Platform";
import ReleaseYear from "./ReleaseYear";
import { genre, platform } from "@/types/dataType";

export default function Navbar() {
  const [value, setValue] = useState<number[]>([1990, 2023]);
  const [checked, setChecked] = useState(new Array(3).fill(false));
  const [platformList, setPlatformList] = useState<platform[] | null>(null);
  const [genreList, setGenreList] = useState<genre[] | null>(null);
  const [selected, setSelected] = useState<genre[] | null>(null);
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
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
        <button className="bg-green-300 w-32 h-12 rounded-md">search</button>

        <div></div>
      </nav>
    </>
  );
}
