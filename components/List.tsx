import { movie } from "@/types/dataType";
import Card from "./Card";

export default function List({ data }: { data: movie[] | null }) {
  console.log(data);
  return (
    <>
      {data &&
        data.map((movie) => {
          return (
            <div className="movie">
              <Card movie={movie} />
            </div>
          );
        })}
    </>
  );
}
