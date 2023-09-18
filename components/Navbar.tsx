import Genre from "./Genre";
import Platform from "./Platform";
import ReleaseYear from "./ReleaseYear";

export default function Navbar() {
  return (
    <>
      <div>home</div>
      <nav className="flex justify-evenly p-3 border-b h-72 items-center">
        <ReleaseYear />

        <Genre />
        <Platform />
        <button>search</button>

        <div></div>
      </nav>
    </>
  );
}
