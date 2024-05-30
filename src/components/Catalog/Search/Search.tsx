import { useEffect, useState } from 'react';

import './Search.css';

interface SearchBarProps {
  currentCategory: string;
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchBarProps> = ({ onSearch, currentCategory }) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setQuery('');
  }, [currentCategory]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search...
      </button>
    </form>
  );
};

export default Search;
