import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleClear = () => {
    onSearchChange({ target: { value: '' } });
    setIsExpanded(false);
  };

  return (
    <div className={`relative flex items-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isExpanded ? 'w-full max-w-sm sm:max-w-md' : 'w-14'}`}>
      <button
        onClick={() => setIsExpanded(true)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/30 dark:bg-black/40 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-lg text-black dark:text-white transition-all duration-300 z-20 ${isExpanded ? 'opacity-0 pointer-events-none scale-50' : 'opacity-100 cursor-pointer hover:bg-white/50 dark:hover:bg-black/60 shadow-2xl scale-100 hover:scale-105'}`}
        aria-label="Open search"
      >
        <Search className="w-6 h-6" />
      </button>

      <div className={`relative w-full transition-all duration-500 origin-left ${isExpanded ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-black/40 dark:text-white/40" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className="block w-full pl-14 pr-14 py-4 rounded-full border border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/40 backdrop-blur-2xl text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-all duration-500 text-lg sm:text-xl font-display uppercase shadow-2xl"
          placeholder="QUERY AUTHOR..."
          value={searchTerm}
          onChange={onSearchChange}
          onBlur={() => {
            if (!searchTerm) setIsExpanded(false);
          }}
        />
        {(isExpanded || searchTerm) && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-5 flex items-center text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
