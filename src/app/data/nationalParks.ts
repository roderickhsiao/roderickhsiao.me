export interface NationalPark {
  /** next-intl key inside travel.parkLabels */
  name: string;
  image: string;
}

export const NATIONAL_PARKS: Record<string, NationalPark[]> = {
  US: [
    { name: 'yosemite',    image: '/national-parks/yosemite.png' },
    { name: 'yellowstone', image: '/national-parks/yellowstone.png' },
    { name: 'grandCanyon', image: '/national-parks/grand-canyon.png' },
    { name: 'joshuaTree',  image: '/national-parks/joshua-tree.png' },
    { name: 'redwood',     image: '/national-parks/redwood.png' },
    { name: 'olympic',     image: '/national-parks/olympic.png' },
    { name: 'deathValley', image: '/national-parks/death-valley.png' },
  ],
  TW: [
    { name: 'taroko',       image: '/national-parks/taorko.png' },
    { name: 'yangmingshan', image: '/national-parks/yangminshan.png' },
    { name: 'kenting',      image: '/national-parks/kenting.png' },
  ],
};
