import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { NationalPark } from '@/app/data/nationalParks';

interface ParkStickerProps {
  park: NationalPark;
  index: number;
}

const ROTATIONS = [-5, 3, -3, 4, -2, 2, -4, 5, -3, 3];

export default function ParkSticker({ park, index }: ParkStickerProps) {
  const t = useTranslations('travel');
  const parkLabels = t.raw('parkLabels') as Record<string, string>;
  const label = parkLabels[park.name] ?? park.name;
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <div
      className="flex flex-col items-center gap-3 group cursor-default"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Sticker image — drop-shadow follows PNG contour */}
      <div
        className="transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2"
      >
        <Image
          src={park.image}
          alt={label}
          width={160}
          height={160}
          className="block w-30 h-40 sm:w-40 sm:h-40 object-contain select-none scale-125"
        />
      </div>

      {/* Name */}
      <span className="type-label text-center text-ink/55 leading-tight max-w-18.75 sm:max-w-22.5 tracking-wider uppercase text-[0.65rem] sm:text-[0.7rem]">
        {label}
      </span>
    </div>
  );
}
