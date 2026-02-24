import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEpisode } from "../api/episodesApi.ts";

interface Episode {
  Title: string;
  Episode: string;
  Season: string;
  Released: string;
  Poster: string;
  Plot: string;
}

const EpisodeDetailPage: React.FC = () => {
  const { season, episode } = useParams<{ season: string; episode: string }>();
  const [ep, setEp] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!season || !episode) return;
    const loadEpisode = async () => {
      try {
        const data = await fetchEpisode(parseInt(season), parseInt(episode));
        setEp(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadEpisode();
  }, [season, episode]);

  if (loading) return <div>Loading episode...</div>;
  if (!ep) return <div>Episode not found.</div>;

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{ep.Title}</h1>
      <img src={ep.Poster} alt={ep.Title} className="w-full mb-4 rounded-lg" />
      <p><strong>Season:</strong> {ep.Season}</p>
      <p><strong>Episode:</strong> {ep.Episode}</p>
      <p><strong>Released:</strong> {ep.Released}</p>
      <p className="mt-4">{ep.Plot}</p>
    </div>
  );
};

export default EpisodeDetailPage;
