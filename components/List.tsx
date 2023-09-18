import { movie } from "@/types/dataType";
import Card from "./Card";
import { Dispatch, SetStateAction, useState } from "react";
import { usePostContext } from "@/utils/PostContext";
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
  const { post, setPost } = usePostContext();
  const handleCardClick = (movie: movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!post) {
      return;
    }
    const dataToSend = {
      pageNumber: post.pageNumber + 1,
      pageCount: 20,
      year: post.year,
      genres: post.genres || null,
      platforms: post.platforms,
    };
    fetch(apiURL + "/api/search", {
      method: "POST",
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        setData((previous) => [...previous, ...data.data.movies]);
        setPost(dataToSend);
      });
  };
  return (
    <>
      <div className="flex flex-wrap  gap-12 justify-center">
        {data &&
          data.map((movie) => {
            return (
              <div className="movie" onClick={() => handleCardClick(movie)}>
                <Card movie={movie} />
              </div>
            );
          })}
      </div>
      <div onClick={handleSubmit} className=" mb-24 ">
        More
      </div>
      {isModalOpen && selectedMovie && (
        <Popup movie={selectedMovie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
