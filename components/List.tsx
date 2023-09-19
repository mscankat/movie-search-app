import { movie } from "@/types/dataType";
import Card from "./Card";
import { Dispatch, SetStateAction, useState } from "react";
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
  const handleCardClick = (movie: movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return data && data.length > 0 ? (
    <>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data ? (
          data.map((movie) => {
            return (
              <div key={movie.id} onClick={() => handleCardClick(movie)}>
                <Card movie={movie} />
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
