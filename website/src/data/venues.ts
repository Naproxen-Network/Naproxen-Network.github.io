export const venues = {
  kdd: { image: '/images/venues/kdd.webp', name: 'ACM SIGKDD', kind: 'identity' },
  emnlp: { image: '/images/venues/emnlp.webp', name: 'EMNLP', kind: 'icon' },
  nature: { image: '/images/venues/nature.webp', name: 'Nature Communications', kind: 'wordmark' },
  physica: { image: '/images/venues/physica.webp', name: 'Physica A', kind: 'wordmark' },
  www: { image: '/images/venues/www.webp', name: 'The Web Conference', kind: 'icon' },
} as const;

export type VenueKey = keyof typeof venues;
