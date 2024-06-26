// src/services/houseService.ts

export const fetchHouses = async (page: number = 1) => {
  const response = await fetch(`/api/houses?page=${page}&per_page=20`);
  if (!response.ok) {
    throw new Error('Failed to fetch houses');
  }
  return response.json();
};
