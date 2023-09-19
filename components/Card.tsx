"use client";
import { movie } from "@/types/dataType";

export default function Card({ movie }: { movie: movie }) {
  return (
    <div className="w-[260px] hover:shadow-md cursor-pointer p-2 rounded-sm bg-white transition-all">
      <img
        className="w-[260px] h-[360px] rounded-sm object-fill"
        src={
          "https://image.tmdb.org/t/p/w300/" + movie.poster_path ||
          "no-image.svg"
        }
        onError={(e) => (e.currentTarget.src = "no-image.svg")}
        alt="movie poster"
      />
      <div className="flex justify-between mt-1 w-full">
        <div className="w-full">
          <div className="flex justify-between ">
            {movie.release_date}{" "}
            <span>
              <div className="flex gap-1"></div>
            </span>
          </div>
          <div className="text-sm font-semibold">{movie.title}</div>
          <div className="text-xs">Rating:{movie.vote_average}/10</div>
          {movie.director && (
            <div className="text-xs">Director:{movie.director[0].name}</div>
          )}
          {movie.actors && (
            <div className="flex flex-wrap text-xs ">
              Cast:
              {movie.actors.map((actor) => {
                return (
                  <div key={actor.actorId}>
                    {actor && (
                      <div className="hover:underline cursor-pointer mx-1">
                        {actor.name}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
