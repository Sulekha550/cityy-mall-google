import { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Layers,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
} from 'lucide-react';
import { BrandFlagship, ZONES } from '../data/exhibitionData';
import { ExhibitionImage } from './ExhibitionImage';

interface BrandDetailModalProps {
  brand: BrandFlagship | null;
  allVisibleBrands: BrandFlagship[];
  onClose: () => void;
  onSelectBrand: (brand: BrandFlagship) => void;
}

export function BrandDetailModal({
  brand,
  allVisibleBrands,
  onClose,
  onSelectBrand,
}: BrandDetailModalProps) {
  const [guestName, setGuestName] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('4:00 PM · Private Tour');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    setIsBooked(false);
    setGuestName('');
  }, [brand?.id]);

  useEffect(() => {
    if (!brand) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [brand, onClose]);

  if (!brand) return null;

  const zone = ZONES.find((z) => z.id === brand.zoneId);
  const currentIdx = allVisibleBrands.findIndex((b) => b.id === brand.id);
  const prevBrand =
    currentIdx > 0 ? allVisibleBrands[currentIdx - 1] : null;
  const nextBrand =
    currentIdx >= 0 && currentIdx < allVisibleBrands.length - 1
      ? allVisibleBrands[currentIdx + 1]
      : null;

  const handleConciergeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setIsBooked(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brand-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141311]/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F7F4EE] text-[#1A1816] border border-[#D8CFC0] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-[#F7F4EE]/95 border-b border-[#E3DACB]">
          <div className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-[#6E6458]">
            <span>{zone?.indexLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{zone?.title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close flagship details"
            className="inline-flex items-center justify-center w-10 h-10 text-[#1A1816] hover:bg-[#EAE3D7] transition-colors focus-visible:outline-2 focus-visible:outline-[#9A7B4F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Visual Column */}
          <div className="lg:col-span-6 bg-[#EAE3D7] relative min-h-[280px] lg:min-h-[420px]">
            <ExhibitionImage
              src={brand.image}
              alt={brand.name}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Editorial Monograph Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.12em] uppercase text-[#7A6852] mb-2">
                <span>{brand.category}</span>
                {brand.rating && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1 font-medium text-[#1A1816] tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-[#9A7B4F] text-[#9A7B4F]" />
                      {brand.rating.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              <h2
                id="brand-modal-title"
                className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#1A1816] mb-3"
              >
                {brand.name}
              </h2>

              {brand.type && (
                <p className="text-xs tracking-[0.08em] uppercase text-[#7A6852] mb-4">
                  {brand.type}
                </p>
              )}

              {brand.description && (
                <p className="text-[15px] leading-relaxed text-[#3F3A34] mb-5">
                  {brand.description}
                </p>
              )}

              {brand.highlights && brand.highlights.length > 0 && (
                <div className="border-t border-[#E3DACB] pt-4 mb-5">
                  <p className="text-xs tracking-[0.14em] uppercase text-[#6E6458] mb-2.5">
                    Curated Highlights
                  </p>
                  <ul className="space-y-1.5 text-sm text-[#2E2A25]">
                    {brand.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-[#9A7B4F] mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Architectural Wayfinding Metadata */}
              <dl className="border-t border-[#E3DACB] pt-4 space-y-2.5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-[#6E6458]">
                    <Layers className="w-4 h-4 text-[#9A7B4F]" />
                    <span>Floor</span>
                  </dt>
                  <dd className="font-medium text-[#1A1816] tabular-nums">
                    {brand.floor}
                  </dd>
                </div>

                {brand.location && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-[#6E6458]">
                      <MapPin className="w-4 h-4 text-[#9A7B4F]" />
                      <span>Location</span>
                    </dt>
                    <dd className="font-medium text-[#1A1816] text-right">
                      {brand.location}
                    </dd>
                  </div>
                )}

                {brand.timing && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="flex items-center gap-2 text-[#6E6458]">
                      <Clock className="w-4 h-4 text-[#9A7B4F]" />
                      <span>Hours</span>
                    </dt>
                    <dd className="font-medium text-[#1A1816] tabular-nums">
                      {brand.timing}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Concierge Private Visit / Table Booking */}
            <div className="border-t border-[#E3DACB] pt-5">
              {isBooked ? (
                <div className="p-4 bg-[#EFEAE1] border border-[#D4C8B4] flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#6D5635] shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-[#1A1816]">
                      Concierge pass reserved for {guestName}
                    </p>
                    <p className="text-[#5C5349] mt-0.5">
                      {brand.name} · {preferredSlot} · {brand.floor}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConciergeSubmit} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs tracking-[0.14em] uppercase text-[#6E6458]">
                    <Calendar className="w-3.5 h-3.5 text-[#9A7B4F]" />
                    <span>Request Concierge Visit</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Guest full name"
                      aria-label="Guest full name"
                      className="px-3.5 py-2.5 text-sm bg-white border border-[#D8CFC0] text-[#1A1816] placeholder:text-[#8E8477] focus:outline-none focus:border-[#9A7B4F]"
                    />
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      aria-label="Preferred concierge appointment slot"
                      className="px-3.5 py-2.5 text-sm bg-white border border-[#D8CFC0] text-[#1A1816] focus:outline-none focus:border-[#9A7B4F]"
                    >
                      <option value="12:30 PM · Midday Concierge">
                        12:30 PM · Midday Concierge
                      </option>
                      <option value="4:00 PM · Private Tour">
                        4:00 PM · Private Tour
                      </option>
                      <option value="7:30 PM · Evening VIP">
                        7:30 PM · Evening VIP
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-5 text-xs tracking-[0.12em] uppercase font-medium bg-[#1A1816] text-[#F7F4EE] hover:bg-[#9A7B4F] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Reserve Concierge Access
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Prev / Next Flagship Navigation */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#EFEAE1] border-t border-[#E3DACB] text-xs">
          <button
            type="button"
            disabled={!prevBrand}
            onClick={() => prevBrand && onSelectBrand(prevBrand)}
            className="inline-flex items-center gap-1.5 font-medium text-[#1A1816] disabled:opacity-35 disabled:cursor-not-allowed hover:text-[#9A7B4F] transition-colors cursor-pointer whitespace-nowrap"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{prevBrand ? prevBrand.name : 'Start of Exhibition'}</span>
          </button>
          <button
            type="button"
            disabled={!nextBrand}
            onClick={() => nextBrand && onSelectBrand(nextBrand)}
            className="inline-flex items-center gap-1.5 font-medium text-[#1A1816] disabled:opacity-35 disabled:cursor-not-allowed hover:text-[#9A7B4F] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>{nextBrand ? nextBrand.name : 'End of Exhibition'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
