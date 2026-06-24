export interface PreshootPhoto {
  id: string;
  src: string;
  alt: string;
}

export interface PreshootCategoryManifest {
  slug: string;
  title: string;
  emailCategory: string;
  hubLabel: string;
  photos: PreshootPhoto[];
}