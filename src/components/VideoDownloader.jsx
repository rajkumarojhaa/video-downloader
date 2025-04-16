import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const VideoDownloader = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // https://rapidapi.com/uzapishop/api/instagram-downloader-download-instagram-videos-stories1/playground/apiendpoint_c7151864-948b-464e-802c-29a953b92720
  const handleDownload = async () => {
    setLoading(true);
    setError("");
    setDownloadUrl("");
    try {
      const response = await axios.request({
        method: 'GET',
        url: 'https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/get-info-rapidapi',
        params: { url: videoUrl },
        headers: {
          'x-rapidapi-key': '6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f',
          'x-rapidapi-host': 'instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com'
        }
      });
      setDownloadUrl(response.data.download_url);
    } catch (err) {
      setError("Failed to fetch video. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-80"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-2xl opacity-20 bottom-10 right-80"></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="w-full max-w-xl p-6 shadow-2xl bg-white/10 backdrop-blur-sm text-white rounded-2xl">
          <CardContent>
            <h1 className="text-3xl font-bold mb-4 text-center">Social Video/Reel Downloader</h1>
            <p className="text-sm text-center mb-6 text-gray-300">Paste any Facebook or Instagram video URL to download</p>
            <Input
              type="text"
              placeholder="Enter video URL..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mb-4 bg-white/20 text-white placeholder-gray-300"
            />
            <Button onClick={handleDownload} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
              {loading ? "Fetching..." : "Download"}
            </Button>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            {downloadUrl && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <div className="mt-6 text-center">
                  <video controls src={downloadUrl} className="w-full rounded-lg mb-4" />
                  <a
                    href={downloadUrl}
                    download
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Download Video
                  </a>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VideoDownloader;
