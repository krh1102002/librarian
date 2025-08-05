import { useState } from 'react';

const SearchInput = ({ placeholder, onSearch, onSelect, results = [] }) => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.length >= 2);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.displayText || item.name || item.title);
    setShowResults(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="form-input"
      />
      
      {showResults && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">
                {item.displayText || item.name || item.title}
              </div>
              {item.subtitle && (
                <div className="text-sm text-gray-500">{item.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;