import { ExternalLink, Plane } from 'lucide-react';

const anchorVariants = [
  'check visa requirements',
  'transit visa rules',
  'airport transit visa requirements',
] as const;

function getAnchorVariant(seed: number): string {
  return anchorVariants[seed % anchorVariants.length];
}

interface TransitVisaNoticeProps {
  airportName?: string;
  anchorSeed?: number;
}

export default function TransitVisaNotice({ airportName, anchorSeed = 0 }: TransitVisaNoticeProps) {
  const anchorText = getAnchorVariant(anchorSeed);

  return (
    <aside
      aria-label="Transit visa requirements notice"
      className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-white border border-[#BFDBFE] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          <Plane className="w-5 h-5 text-info" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-[#1E3A5F] mb-2">
            Check Transit Visa Requirements
          </h3>
          <p className="text-[#374151] text-sm leading-relaxed mb-3">
            Some countries require travelers to obtain a transit visa even when remaining inside the airport terminal
            {airportName ? ` at ${airportName}` : ''}.{' '}
            Visa rules depend on your <strong>nationality</strong>, the <strong>airport location</strong>, your{' '}
            <strong>layover duration</strong>, and whether you leave the secure transit area to enter the country.
          </p>
          <a
            href="https://visainfoguide.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-info hover:bg-info-hover text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
          >
            {anchorText.charAt(0).toUpperCase() + anchorText.slice(1)}
            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          </a>
        </div>
      </div>
    </aside>
  );
}
