import { memo } from 'react';
import { Heart } from 'lucide-react';

const PhotoCard = ({ photo, isFavourite, onToggleFavourite, index = 0 }) => {
  return (
    <div className={`group relative bg-white/5 dark:bg-black/20 border border-gray-200 dark:border-white/10 backdrop-blur-md rounded-3xl transition-all duration-500 overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:border-white/40 ${index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className="w-full h-full min-h-[400px] overflow-hidden bg-gray-200 dark:bg-gray-800 relative rounded-3xl">
        <img
          src={photo.download_url}
          alt={`By ${photo.author}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Sleek Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
      
      {/* Floating Glassmorphic Content Block */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-10 transition-transform duration-500 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex justify-center">
        <div className="bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-white/20 px-5 py-3 rounded-2xl flex items-center gap-4 shadow-lg w-fit max-w-[90%]">
          <div className="min-w-0">
            <p className="font-display text-white text-[10px] tracking-widest mb-0.5 opacity-80 uppercase">
              NO. {String(index + 1).padStart(3, '0')}
            </p>
            <p className="font-display text-white text-xl md:text-2xl uppercase truncate leading-none">
              {photo.author}
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleFavourite(photo);
            }}
            className={`shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
              isFavourite 
                ? 'bg-white text-black shadow-lg shadow-white/20' 
                : 'bg-black/40 text-white hover:bg-white border border-transparent hover:border-white hover:text-black'
            }`}
            aria-label="Toggle favourite"
          >
            <Heart 
              className={`w-4 h-4 transition-transform duration-300 ${isFavourite ? 'fill-current scale-110' : 'scale-100'}`} 
            />
          </button>
        </div>
      </div>
      
      {/* Static Indicator */}
      {isFavourite && (
        <div className="absolute top-4 right-4 z-10 transition-transform duration-500 group-hover:scale-110">
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-2 rounded-xl shadow-sm border border-white/50 dark:border-white/20">
            <Heart className="w-4 h-4 text-rose-500 dark:text-white fill-current" />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PhotoCard);
