"use client";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import { dataType, movie } from "@/types/dataType";
import { usePostContext } from "@/utils/PostContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<movie[] | null>(null);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";
  const { post, setPost } = usePostContext();
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
        const movies: dataType = await response.json();
        console.log(movies);
        setData(movies.data.movies);
        setPost({
          pageNumber: 1,
          pageCount: 20,
          year: "-",
          genres: null,
          platforms: null,
        });
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);
  return (
    <>
      <SearchBar data={data} setData={setData} />

      <div className="p-16 text-5xl">Results</div>
      <div className="flex flex-wrap px-28 gap-20 justify-center">
        <List data={data} setData={setData} />
      </div>
      <div className="h-20 bg-slate-400">footer</div>
    </>
  );
}
