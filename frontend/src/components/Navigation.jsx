import { Camera, Image as ImageIcon, Heart, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navigation = ({ view, setView }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <nav className="flex items-center gap-2 p-2 bg-white/30 dark:bg-black/40 backdrop-blur-2xl border border-white/50 dark:border-white/10 shadow-xl transition-colors duration-500 rounded-full">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setView('gallery')}
          className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            view === 'gallery'
              ? 'bg-white/80 dark:bg-white/20 text-black dark:text-white shadow-sm border border-white/60 dark:border-white/20'
              : 'bg-transparent text-black/60 dark:text-white/60 hover:bg-white/40 dark:hover:bg-white/10'
          }`}
          aria-label="Gallery View"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => setView('favourites')}
          className={`group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
            view === 'favourites'
              ? 'bg-white/80 dark:bg-white/20 text-black dark:text-white shadow-sm border border-white/60 dark:border-white/20'
              : 'bg-transparent text-black/60 dark:text-white/60 hover:bg-white/40 dark:hover:bg-white/10'
          }`}
          aria-label="Favourites View"
        >
          <Heart className={`w-5 h-5 ${view === 'favourites' ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="w-px h-8 bg-black/20 dark:bg-white/20 mx-1"></div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent text-black/60 dark:text-white/60 hover:bg-white/40 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-300"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </nav>
  );
};

export default Navigation;
