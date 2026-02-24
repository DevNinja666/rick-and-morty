import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEpisode } from "../api/episodesApi.ts";

interface Episode {
  Title: string;
  Episode: string;
  Season: string;
  Released: string;
  Poster: string;
}

const EpisodesPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEpisodes = async () => {
      const epList: Episode[] = [];
      const season = 1;
      for (let ep = 1; ep <= 11; ep++) { 
        try {
          const data = await fetchEpisode(season, ep);
          epList.push(data);
        } catch (error) {
          console.error(error);
        }
      }
      setEpisodes(epList);
      setLoading(false);
    };
    loadEpisodes();
  }, []);

  if (loading) return <div>Loading episodes...</div>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {episodes.map((ep) => (
        <Link
          key={`${ep.Season}-${ep.Episode}`}
          to={`/episodes/${ep.Season}/${ep.Episode}`}
          className="bg-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-transform"
        >
          <img src={ep.Poster} alt={ep.Title} className="w-full h-64 object-cover" />
          <div className="p-4 text-white">
            <h2 className="text-lg font-bold">{ep.Title}</h2>
            <p>Season {ep.Season}, Episode {ep.Episode}</p>
            <p>{ep.Released}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default EpisodesPage;
