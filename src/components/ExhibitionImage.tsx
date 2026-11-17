import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ExhibitionImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ExhibitionImage({
  src,
  alt,
  className = '',
  priority = false,
}: ExhibitionImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE3D7] via-[#DFD5C5] to-[#CFC2AE] text-[#5C4D3C] p-6 text-center ${className}`}
      >
        <Building2 className="w-7 h-7 opacity-60 mb-2" strokeWidth={1.3} />
        <span className="font-serif text-sm tracking-wide uppercase">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
