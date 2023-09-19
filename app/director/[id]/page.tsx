"use client";
import Card from "@/components/Card";
import Popup from "@/components/Popup";
import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const splitParams = params.id.split("-");
  const name = splitParams.slice(1, splitParams.length).join(" ");
  const [selectedMovie, setSelectedMovie] = useState<movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCardClick = (movie: movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const Url = `https://api.themoviedb.org/3/person/${
        params.id.split("-")[0]
      }/movie_credits?language=en-US`;
      const response = await fetch(Url, options);
      const data = await response.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <>
      <nav className="h-24 bg-slate-200">
        <Link href="/">
          <img className="m-auto pt-2" src="/movie-icon.png" alt="" />
        </Link>
      </nav>
      <div className="text-3xl p-20 ">
        Movies by <span className="font-bold">{name}</span>
      </div>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data &&
          data.crew.map((movie: movie) => {
            if (movie.job === "Director") {
              return (
                <div key={movie.id} onClick={() => handleCardClick(movie)}>
                  <Card movie={movie} />
                </div>
              );
            }
          })}
      </div>
      {isModalOpen && selectedMovie && (
        <Popup movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
