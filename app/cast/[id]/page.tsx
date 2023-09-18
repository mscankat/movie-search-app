import Card from "@/components/Card";

import { movie } from "@/types/dataType";

export default async function Page({ params }: { params: { id: string } }) {
  const Url = process.env.NEXT_PUBLIC_API_HOST || "";
  const response = await fetch(Url + "/get-movie-list", {
    method: "POST",
    body: JSON.stringify({ actorId: params.id }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  console.log(data);

  return (
    <>
      <div className="flex flex-wrap  gap-20 justify-center">
        {data &&
          data.data.movies.map((movie: movie) => {
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
