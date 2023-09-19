"use client";
import List from "@/components/List";
import Spinner from "@/components/Spinner";
import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const splitParams = params.id.split("-");
  const name = splitParams.slice(1, splitParams.length).join(" ");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<movie[] | null>(null);
  useEffect(() => {
    const getData = async () => {
      const Url = `https://api.themoviedb.org/3/person/${
        params.id.split("-")[0]
      }/movie_credits?language=en-US`;
      const response = await fetch(Url, options);
      const data = await response.json();
      setData(data.crew);
      setIsLoading(false);
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
        {isLoading ? <Spinner /> : <List data={data} setData={setData} />}
      </div>
    </>
  );
}
