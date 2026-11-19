import { useEffect, useRef, useState } from 'react';
import { Building2 } from 'lucide-react';

// Global memory cache of loaded image URLs to guarantee 0ms instant display on subsequent renders
const GLOBAL_IMAGE_CACHE = new Set();

export function ResilientImage({
  src,
  alt,
  className = '',
  priority = false,
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(() => {
    if (!src) return false;
    return GLOBAL_IMAGE_CACHE.has(src);
  });
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src) return;

    if (GLOBAL_IMAGE_CACHE.has(src)) {
      setLoaded(true);
      return;
    }

    // Check if the browser already has the image completed in cache
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      GLOBAL_IMAGE_CACHE.add(src);
      setLoaded(true);
      return;
    }

    setLoaded(false);
    setFailed(false);
  }, [src]);

  const handleLoad = () => {
    if (src) GLOBAL_IMAGE_CACHE.add(src);
    setLoaded(true);
  };

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#EFE6FA] via-[#FDE8DF] to-[#E4F5F0] dark:from-[#231938] dark:via-[#281A22] dark:to-[#132524] text-[#1B1325] dark:text-[#F6EFE7] ${className}`}
      >
        <Building2 className="w-7 h-7 opacity-65 mb-2" strokeWidth={1.4} />
        <span className="font-display text-sm font-medium">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Smooth Skeleton Shimmer Placeholder while loading (non-priority only) */}
      {!loaded && !priority && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 via-pink-100/40 to-purple-100/50 dark:from-purple-950/50 dark:via-pink-950/40 dark:to-purple-950/50 animate-pulse pointer-events-none" />
      )}
      <img
        ref={imgRef}
        key={src}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'auto' : 'async'}
        onLoad={handleLoad}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover ${
          priority || loaded ? 'opacity-100' : 'opacity-0'
        } ${priority || GLOBAL_IMAGE_CACHE.has(src) ? '' : 'transition-opacity duration-200'}`}
      />
    </div>
  );
}

export default ResilientImage;
