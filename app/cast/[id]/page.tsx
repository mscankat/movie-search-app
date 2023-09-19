import Card from "@/components/Card";

import { movie } from "@/types/dataType";
import { options } from "@/utils/fetchOptions";

export default async function Page({ params }: { params: { id: string } }) {
  const Url = `https://api.themoviedb.org/3/person/${params.id}/movie_credits?language=en-US`;
  const response = await fetch(Url, options);
  const data = await response.json();
  console.log(data);

  return (
    <>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data &&
          data.cast.map((movie: movie) => {
            return (
              <div className="movie">
                <Card movie={movie} />
              </div>
            );
          })}
      </div>
    </>
  );
}
