"use client";
import List from "@/components/List";
import Popup from "@/components/Popup";
import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";

export default function Page({ params }: { params: { id: string } }) {
  const splitParams = params.id.split("-");
  const name = splitParams.slice(1, splitParams.length).join(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<movie[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const Url = `https://api.themoviedb.org/3/person/${
          params.id.split("-")[0]
        }/movie_credits?language=en-US`;
        const response = await fetch(Url, options);

        if (!response.ok) {
          // Check if the response status is not OK (e.g., 404 or 500)
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data.cast);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
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
        Featuring <span className="font-bold">{name}</span>
      </div>
      <div className="flex flex-wrap gap-20 justify-center">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <List data={data} setData={setData} />
        )}
      </div>
      {isModalOpen && selectedMovie && (
        <Popup movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
