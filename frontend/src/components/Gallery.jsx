import { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import useFetchPhotos from '../hooks/useFetchPhotos';
import { favouritesReducer, favouritesInitialState } from '../reducers/favouritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import Navigation from './Navigation';
import { LayoutGrid, Sparkles } from 'lucide-react';

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('gallery'); // 'gallery' or 'favourites'
  const [favourites, dispatch] = useReducer(favouritesReducer, favouritesInitialState);

  // Fetch initial favourites from backend
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/favourites');
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'SET_FAVOURITES', payload: data });
        }
      } catch (error) {
        console.error('Failed to fetch favourites from backend:', error);
      }
    };
    fetchFavourites();
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // Filter based on active view (All photos vs Favourites)
  const displayPhotos = useMemo(() => {
    const baseList = view === 'gallery' ? photos : favourites;

    if (!searchTerm.trim()) return baseList;

    const lowercasedSearch = searchTerm.toLowerCase();
    return baseList.filter((photo) =>
      photo.author.toLowerCase().includes(lowercasedSearch)
    );
  }, [photos, favourites, searchTerm, view]);

  const handleToggleFavourite = useCallback(async (photo) => {
    const isFavourite = favourites.some(fav => fav.id === photo.id);

    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo });

    try {
      if (isFavourite) {
        await fetch(`http://localhost:5000/api/favourites/${photo.id}`, {
          method: 'DELETE',
        });
      } else {
        await fetch('http://localhost:5000/api/favourites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: photo.id,
            author: photo.author,
            width: photo.width,
            height: photo.height,
            url: photo.url,
            download_url: photo.download_url
          }),
        });
      }
    } catch (error) {
      console.error('Failed to sync favourite with backend:', error);
    }
  }, [favourites]);

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-500 overflow-x-hidden pb-32">
      {/* Global Noise Overlay */}
      <div className="noise-bg"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-12 md:py-24 w-full relative z-10">

        {/* Header Section - Inline Layout */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 border-b-2 border-black dark:border-white pb-6 md:pb-8 transition-colors duration-500">

          {/* Title & Search Group */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
            {/* Title Area */}
            <div className="flex-shrink-0 flex flex-col">
              <h1 className="font-display text-[15vw] md:text-[8rem] lg:text-[10rem] leading-[0.85] uppercase tracking-tighter m-0 whitespace-nowrap">
                {view === 'gallery' ? 'GALLERY' : 'INDEX'}
              </h1>
              <h2 className="text-sm md:text-xl font-semibold uppercase tracking-widest mt-2 md:mt-4 opacity-70">
                {view === 'gallery' ? 'Vol. 01 / Curated Captures' : 'Selected / Personal Favourites'}
              </h2>
            </div>

            {/* Search Bar - Inline immediately next to title */}
            <div>
              <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </div>
          </div>

          {/* Counter Area */}
          <div className="text-left md:text-right flex-shrink-0 flex items-center md:items-end md:flex-col gap-3 md:gap-0 mt-4 md:mt-0">
            <span className="font-display text-5xl md:text-6xl lg:text-7xl tabular-nums leading-none">
              {String(displayPhotos.length).padStart(3, '0')}
            </span>
            <span className="block text-xs md:text-sm uppercase font-bold tracking-widest mt-1 opacity-70">Found</span>
          </div>

        </div>

        {/* Status Handling */}
        {loading && view === 'gallery' ? (
          <div className="min-h-[50vh] flex flex-col items-center justify-center">
            <h2 className="font-display text-6xl animate-pulse">LOADING</h2>
          </div>
        ) : error && view === 'gallery' ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="border border-black/10 dark:border-white/10 p-8 max-w-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl transition-colors duration-500 text-center">
              <h2 className="font-display text-4xl mb-4 uppercase text-rose-500">System Error</h2>
              <p className="text-xl font-medium">{error}</p>
            </div>
          </div>
        ) : (
          /* Grid Rendering - Unconventional layout */
          <>
            {displayPhotos.length === 0 ? (
              <div className="text-center py-32 border border-black/10 dark:border-white/10 shadow-2xl bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl transition-colors duration-500">
                <h2 className="font-display text-4xl mb-4">EMPTY</h2>
                <p className="text-lg font-medium max-w-xl mx-auto opacity-70">
                  {view === 'favourites' && !searchTerm
                    ? "Your collection is barren."
                    : "No matching records found in the archive."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                {displayPhotos.map((photo, index) => {
                  const isFavourite = favourites.some(fav => fav.id === photo.id);
                  return (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      isFavourite={isFavourite}
                      onToggleFavourite={handleToggleFavourite}
                      index={index}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <Navigation view={view} setView={setView} />
      </div>
    </div>
  );
};

export default Gallery;
