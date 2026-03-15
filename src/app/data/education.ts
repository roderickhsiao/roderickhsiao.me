// Education entries — structural/non-translatable fields only.
// All display text (name, location, college, degree, department)
// lives in en.json under 'education.items'.
export interface EducationItem {
  key: string;
  /** ISO year-month, e.g. '2004-09' */
  startDate: string;
  /** ISO year-month, e.g. '2008-06' */
  endDate?: string;
  thumbnail: { url: string; width: number; height: number };
}

const education: EducationItem[] = [
  {
    key: 'nccu',
    startDate: '2004-09',
    endDate: '2008-06',
    thumbnail: { url: '/nccuLogo.jpg', width: 200, height: 200 }
  },
  {
    key: 'mannheim',
    startDate: '2008-01',
    endDate: '2008-06',
    thumbnail: { url: '/mannheim.png', width: 200, height: 200 }
  }
];

export default education;
