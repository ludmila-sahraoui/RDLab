import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-4 py-2 rounded-lg bg-grey-light focus:outline-none  w-full"
      />
    </form>
  );
};

export default SearchBar;
