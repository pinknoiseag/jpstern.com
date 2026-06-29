import manifest from './gallery-manifest.json';
import config from './gallery-config.json';

export type PortfolioEntry = {
  slug: string;
  href: string;
  title: string;
  description: string;
  cover: string | null;
  count: number;
};

const order = ['works-i', 'works-ii', 'works-iii'] as const;

export const portfolioEntries: PortfolioEntry[] = order.map((slug) => {
  const gallery = manifest.find((g) => g.slug === slug);
  const cfg = config[slug as keyof typeof config];
  return {
    slug,
    href: `/${slug}/`,
    title: gallery?.title ?? cfg?.title ?? slug,
    description: gallery?.description ?? cfg?.description ?? '',
    cover: gallery?.images[0]?.src ?? null,
    count: gallery?.images.length ?? 0,
  };
});