import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DownloadPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { url, quality } = location.state || {};

  useEffect(() => {
    // Handle back button
    const handlePopState = () => {
      navigate("/youtube-downloader", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    if (!url) {
      alert("Download URL not found.");
      navigate("/youtube-downloader");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = `youtube-video-${quality || "video"}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [url, quality, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
      <p>Downloading {quality || "video"}...</p>
    </div>
  );
};

export default DownloadPage;
