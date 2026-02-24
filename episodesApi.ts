const API_KEY = "124df000";
const BASE_URL = "https://www.omdbapi.com/";

export const fetchEpisode = async (season: number, episode: number) => {
  const url = `${BASE_URL}?t=Rick&Morty&Season=${season}&Episode=${episode}&apikey=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch episode");
  const data = await res.json();
  return data;
};
