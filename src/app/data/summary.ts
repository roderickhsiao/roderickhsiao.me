// Main profile summary — structural/non-translatable fields only.
// All display text lives in en.json under the 'profile' namespace.
export interface ProfileThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ProfileStructure {
  thumbnail: ProfileThumbnail;
  /** Residency locations used in the travel/footer UI */
  residency: string[];
}

const summary: { profile: ProfileStructure } = {
  profile: {
    thumbnail: {
      url: '/profile.jpg',
      width: 200,
      height: 200,
    },
    residency: ['SF Bay Area', 'Taipei'],
  },
};

export default summary;
