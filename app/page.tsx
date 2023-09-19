"use client";
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import Spinner from "@/components/Spinner";
import { movie } from "@/types/dataType";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<movie[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";
  useEffect(() => {
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
        setIsLoading(false);
      } catch (e) {
        console.log("fetch error:", e);
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <SearchBar setData={setData} />

      <div className="p-16 text-5xl">Results</div>

      {isLoading ? ( // Render spinner while loading
        <Spinner /> // Replace 'Spinner' with your actual spinner component
      ) : (
        <List data={data} setData={setData} /> // Render your content when data is available
      )}
    </>
  );
}
