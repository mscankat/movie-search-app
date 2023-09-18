export default function Navbar() {
  return (
    <nav className="flex justify-between p-3 border-b">
      <div>home</div>
      <div className="flex justify-center gap-8">
        <div>Genre</div>
        <div>Release Year</div>
        <div>Platform</div>
        <button>search</button>
      </div>
      <div></div>
    </nav>
  );
}
