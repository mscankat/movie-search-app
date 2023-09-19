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
  const [error, setError] = useState<string | null>(null);

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
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  return (
    <>
      <SearchBar setData={setData} setIsLoading={setIsLoading} />

      <div className="p-16 text-5xl">Results</div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <List data={data} setData={setData} />
      )}
    </>
  );
}
