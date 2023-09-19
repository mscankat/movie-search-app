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
  const apiURL = process.env.NEXT_PUBLIC_SERVER_HOST || "";
  const handleCardClick = (movie: movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data ? (
          data.map((movie) => {
            return (
              <div onClick={() => handleCardClick(movie)}>
                <Card key={movie.id} movie={movie} />
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
  );
}
