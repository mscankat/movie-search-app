import Card from "@/components/Card";

import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";

export default async function Page({ params }: { params: { id: string } }) {
  const splitParams = params.id.split("-");
  const name = splitParams.slice(1, splitParams.length).join(" ");
  console.log(splitParams.slice(1, splitParams.length).join(" "));
  const Url = `https://api.themoviedb.org/3/person/${
    params.id.split("-")[0]
  }/movie_credits?language=en-US`;
  const response = await fetch(Url, options);
  const data = await response.json();

  return (
    <>
      <nav className="h-24 bg-slate-200">Home</nav>
      <div className="text-3xl p-20 ">
        Movies by <span className="font-bold">{name}</span>
      </div>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data &&
          data.crew.map((movie: movie) => {
            if (movie.job === "Director") {
              return (
                <div className="movie">
                  <Card movie={movie} />
                </div>
              );
            }
          })}
      </div>
    </>
  );
}
