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
            pageSize: 20,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "*",
          },
        });
        const data = await response.json();
        setData(data);
        console.log(data);
        setPost({
          pageNumber: 1,
          pageCount: 20,
          year: [2000, 2023],
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
      <SearchBar setData={setData} />

      <div className="p-16 text-5xl">Results</div>

      <List data={data} setData={setData} />

      <div className="h-20 bg-slate-400">footer</div>
    </>
  );
}
