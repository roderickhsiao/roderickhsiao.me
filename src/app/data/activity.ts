// Extracurricular activities — structural/non-translatable fields only.
// All display text (name, org, summary, smartlink title/description)
// lives in en.json under 'activity.items'.
export interface ActivitySmartlink {
  url: string;
  thumbnail?: { url: string; width: number; height: number };
}

export interface ActivityItem {
  key: string;
  year: string;
  smartlink?: ActivitySmartlink;
}

const activity: ActivityItem[] = [
  {
    key: 'str8jacket',
    year: '2017 - 2024',
    smartlink: {
      thumbnail: { url: '/str8jacket.jpeg', width: 150, height: 150 },
      url: 'https://www.str8jacketdance.com/'
    }
  },
  {
    key: 'hsnuAwb',
    year: '- 2012',
    smartlink: {
      thumbnail: { url: '/hsnu.png', width: 234, height: 234 },
      url: 'http://www.hsnuawb.tw/'
    }
  },
  { key: 'orbis', year: 'Oct, 2010' },
  { key: 'armyFlood', year: 'Aug, 2010' },
  { key: 'mannheimExchange', year: 'Jan 2008 – Jun 2008' }
];

export default activity;
