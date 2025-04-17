import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import YouTubeDownloader from "./components/YouTubeDownloader";
import VideoDownloader from "./components/VideoDownloader"; 
import Navbar from "./components/Navbar";
import DownloadPage from "./components/DownloadPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/youtube-downloader" element={<YouTubeDownloader />} />
        <Route path="/video-downloader" element={<VideoDownloader />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
}

export default App;
