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
              className="m-auto rounded h-[300px] object-scale-down w-full "
              src={
                "https://image.tmdb.org/t/p/original/" + movie.backdrop_path ||
                movie.poster_path
              }
              alt="movie poster"
              width={240}
              height={360}
            />
            <div className="text-sm font-light">{movie.release_date}</div>
            <div className="text-2xl font-bold">{movie.title}</div>
            <div className="mb-2">{movie.overview}</div>
            {movie.actors && (
              <div className="flex gap-2 text-sm">
                Cast:
                {movie.actors.map((actor) => {
                  return (
                    <div className="hover:underline cursor-pointer">
                      <Link href={"cast/" + actor.id}>{actor.name}</Link>
                    </div>
                  );
                })}
              </div>
            )}
            {movie.director && (
              <div className="mt-1 text-sm">
                Director:
                <span className="hover:underline cursor-pointer ml-2">
                  <Link href={"cast/" + movie.director[0].id}>
                    {movie.director[0].name}
                  </Link>
                </span>
              </div>
            )}

            {/* <div className="flex mt-2 gap-4">
              {movie.platforms.map((platform) => {
                return (
                  <img
                    className="w-24"
                    src={platform.platformLogoUrl}
                    alt="platform logo"
                  />
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
