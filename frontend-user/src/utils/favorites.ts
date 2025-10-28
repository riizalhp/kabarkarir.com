const FAVORITES_KEY = 'kabarkarir_favorites';

export const getFavoriteJobs = (): number[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading favorites from localStorage", error);
    return [];
  }
};

export const addFavoriteJob = (jobId: number): void => {
  const favorites = getFavoriteJobs();
  if (!favorites.includes(jobId)) {
    const newFavorites = [...favorites, jobId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  }
};

export const removeFavoriteJob = (jobId: number): void => {
  let favorites = getFavoriteJobs();
  favorites = favorites.filter(id => id !== jobId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isJobFavorite = (jobId: number): boolean => {
  const favorites = getFavoriteJobs();
  return favorites.includes(jobId);
};

const PELATIHAN_FAVORITES_KEY = 'kabarkarir_pelatihan_favorites';

export const getFavoritePelatihan = (): number[] => {
  try {
    const favorites = localStorage.getItem(PELATIHAN_FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error reading pelatihan favorites from localStorage", error);
    return [];
  }
};

export const addFavoritePelatihan = (pelatihanId: number): void => {
  const favorites = getFavoritePelatihan();
  if (!favorites.includes(pelatihanId)) {
    const newFavorites = [...favorites, pelatihanId];
    localStorage.setItem(PELATIHAN_FAVORITES_KEY, JSON.stringify(newFavorites));
  }
};

export const removeFavoritePelatihan = (pelatihanId: number): void => {
  let favorites = getFavoritePelatihan();
  favorites = favorites.filter(id => id !== pelatihanId);
  localStorage.setItem(PELATIHAN_FAVORITES_KEY, JSON.stringify(favorites));
};

export const isPelatihanFavorite = (pelatihanId: number): boolean => {
  const favorites = getFavoritePelatihan();
  return favorites.includes(pelatihanId);
};