import { movie } from "@/types/dataType";
import Image from "next/image";
import Link from "next/link";

export default function Popup({
  movie,
  onClose,
}: {
  movie: movie;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-all">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl max-h-3/4 overflow-y-auto">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              className="text-gray-500 hover:text-gray-700 text-lg font-semibold"
              onClick={onClose}
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            {/* Display movie details here */}
            <img
              className="m-auto rounded"
              src={movie.posterUrl}
              alt="movie poster"
              width={240}
              height={360}
            />
            <div className="text-sm font-light">{movie.releaseYear}</div>
            <div className="text-2xl font-bold">{movie.name}</div>
            <div className="mb-2">{movie.descriptionContent}</div>
            <div className="flex gap-2 text-sm">
              Cast:
              {movie.actors.map((actor) => {
                return (
                  <div className="hover:underline cursor-pointer">
                    <Link href={"cast/" + actor.actorId}>
                      {actor.actorName}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="mt-1 text-sm">
              Director:
              <span className="hover:underline cursor-pointer ml-2">
                {movie.director.directorName}
              </span>
            </div>
            <div className="flex mt-2 gap-4">
              {movie.platforms.map((platform) => {
                return (
                  <img
                    className="w-24"
                    src={platform.platformLogoUrl}
                    alt="platform logo"
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
