import { venues, type VenueKey } from '../data/venues';

export function VenueMark({ venue }: { venue: VenueKey }) {
  const mark = venues[venue];
  return <img className={`venue-mark venue-mark-${mark.kind}`} src={mark.image} alt={`${mark.name} logo`} width={mark.kind === 'icon' ? 22 : mark.kind === 'identity' ? 60 : 72} height={mark.kind === 'identity' ? 36 : 22} loading="lazy" />;
}
