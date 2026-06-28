function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search by Loom ID or Weaver Name..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-lg p-3 shadow"
    />
  );
}

export default SearchBar;