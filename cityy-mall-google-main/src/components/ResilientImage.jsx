import { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

export function ResilientImage({
  src,
  alt,
  className = '',
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

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
    <img
      key={src}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
