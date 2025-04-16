import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import YouTubeDownloader from "./components/YouTubeDownloader";
import VideoDownloader from "./components/VideoDownloader"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
        <Route path="/video-downloader" element={<VideoDownloader />} />
      </Routes>
    </Router>
  );
}

export default App;
