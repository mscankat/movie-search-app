import { genre, genreList, movie } from "@/types/dataType";
import Card from "./Card";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Popup from "./Popup";

export default function List({
  data,
  setData,
}: {
  data: movie[] | null;
  setData: Dispatch<SetStateAction<movie[] | null>>;
}) {
  const [selectedMovie, setSelectedMovie] = useState<movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genreList, setGenreList] = useState<genre[] | null>(null);
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";

  const handleCardClick = (movie: movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("fetching");
        const response = await fetch(apiURL + "/api/genres");
        const genreData: genreList = await response.json();
        console.log(genreData);
        setGenreList(genreData.genres);
      } catch (e) {
        console.log("fetch error:", e);
      }
    };
    getData();
  }, []);

  return data && data.length > 0 ? (
    <>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data ? (
          data.map((movie) => {
            return (
              <div key={movie.id} onClick={() => handleCardClick(movie)}>
                <Card movie={movie} genreList={genreList} />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>

      {isModalOpen && selectedMovie && (
        <Popup movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  ) : (
    <div className="font-bold text-lg text-center ">No results found!</div>
  );
}
