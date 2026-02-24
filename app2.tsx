import EpisodesPage from "./pages/EpisodesPage.tsx";
import EpisodeDetailPage from "./pages/EpisodeDetailPage.tsx";
<Route path="episodes" element={<EpisodesPage />} />
<Route path="episodes/:season/:episode" element={<EpisodeDetailPage />} />
