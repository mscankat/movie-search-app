import { movie } from "@/types/dataType";

export default function Card({ movie }: { movie: movie }) {
  return (
    <div className="w-64 hover:shadow-md cursor-pointer p-2 rounded-sm">
      <img
        className="w-60 h-[360px] rounded-sm object-cover"
        src={movie.posterUrl || "no-image.svg"}
        onError={(e) => (e.currentTarget.src = "no-image.svg")}
        alt="movie poster"
      />
      <div>{movie.releaseYear}</div>
      <div>{movie.name}</div>
      <div>{movie.rating}</div>
    </div>
  );
}
