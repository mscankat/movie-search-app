import Genre from "./Genre";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-3 border-b h-64 items-center">
      <div>home</div>
      <div className="flex justify-center gap-8">
        <Genre />
        <div>Release Year</div>
        <div>Platform</div>
        <button>search</button>
      </div>
      <div></div>
    </nav>
  );
}
