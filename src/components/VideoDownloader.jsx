import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { BsChatQuote } from "react-icons/bs";


const testimonials = [
  {
    name: "Alex Johnson",
    feedback: "Super easy to use! Downloaded my Instagram reel in seconds!",
  },
  {
    name: "Maria Gomez",
    feedback: "Perfect for saving Facebook videos for offline viewing.",
  },
  {
    name: "Daniel Lee",
    feedback: "Fast, clean, and simple. Love the UI!",
  },
];

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
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 lg:px-12 py-12 pt-20 overflow-hidden">
      {/* Blur Circles */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10 z-0"></div>
      <div className="absolute w-80 h-80 bg-pink-500 rounded-full blur-2xl opacity-20 bottom-10 right-10 z-0"></div>

      {/* Hero Section */}
      <motion.div
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Illustration */}
        <img
          src="https://www.apptamin.com/wp-content/uploads/2021/07/Untitled-design-scaled.jpg"
          alt="hero"
          className="w-full max-w-md mx-auto lg:mx-0"
        />

        {/* Form */}
        <Card className="w-full max-w-xl bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
          <CardContent>
            <div className="flex items-center justify-center gap-4 mb-6">
              <FaInstagram size={30} className="text-pink-500" />
              <FaFacebookF size={30} className="text-blue-500" />
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-3">
              Social Video / Reel Downloader
            </h1>
            <p className="text-sm text-gray-300 text-center mb-6">
              Paste any Facebook or Instagram video URL to download.
            </p>
            <Input
              type="text"
              placeholder="Enter video URL..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="mb-4 bg-white/20 text-white placeholder-gray-300"
            />
            <Button
              onClick={handleDownload}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Fetching..." : "Download"}
            </Button>
            {error && (
              <p className="mt-4 text-red-500 text-center text-sm">{error}</p>
            )}
            {downloadUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mt-6 text-center">
                  <video
                    controls
                    src={downloadUrl}
                    className="w-full rounded-lg mb-4 max-h-[300px] object-contain"
                  />
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

      {/* Testimonials */}
      <div className="mt-20 relative z-10">
        <h2 className="text-2xl sm:text-3xl text-center text-white font-semibold mb-10">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <BsChatQuote className="text-pink-400 mb-3 text-2xl" />
              <p className="text-sm mb-4 italic">"{t.feedback}"</p>
              <p className="text-right text-sm font-semibold text-gray-300">— {t.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDownloader;
