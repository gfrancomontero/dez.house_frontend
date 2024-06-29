// src/services/houseService.ts
export const fetchHouses = async (page: number = 1, searchParams: { location?: string } = {}) => {
  const queryParams = new URLSearchParams({ page: page.toString(), per_page: '20', ...searchParams }).toString();
  const response = await fetch(`/api/houses?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch houses');
  }
  return response.json();
};
