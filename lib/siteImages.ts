const pexels = (id: number, width = 1600) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const SITE_IMAGES = {
  hero: pexels(4894608, 1800),
  technician: pexels(4176550, 1400),
  rodent: pexels(69221, 1400),
  ants: pexels(35702443, 1200),
  residentialFogging: pexels(19789841, 1600),
  commercialFogging: pexels(32055757, 1600),
  exteriorSpray: pexels(16851694, 1600),
  mosquitoFogging: pexels(19789837, 1600),
  neighborhoodFogging: pexels(37020717, 1400),
  fieldTreatment: pexels(26872245, 1600),
} as const;
