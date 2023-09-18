import Card from "./Card";

export default function List({ data }: { data: any }) {
  console.log(data);
  return (
    <>
      {data &&
        data.map((movie: any) => {
          return (
            <div className="movie">
              {movie.name}
              <Card />
            </div>
          );
        })}
    </>
  );
}
