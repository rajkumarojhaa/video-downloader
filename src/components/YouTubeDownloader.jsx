import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { ArrowRight, DownloadCloud, RefreshCcw, Home } from "lucide-react";


// https://rapidapi.com/officialofun-C-wpfpix418/api/youtube-video-and-shorts-downloader/playground/apiendpoint_b4535862-4f2d-4648-bd0a-005c694c5e06
const YouTubeDownloader = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadLinks, setDownloadLinks] = useState(null);
  const [quality, setQuality] = useState("720p");
  const [loading, setLoading] = useState(false);

  const extractYouTubeID = (url) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const API_KEYS = [
    "6131edcb4cmsh23ebb63bba81107p1b37d5jsn13862f0d1d3f",
    "7ba2cdfa25msh23e9fe866328575p12d494jsn85cb70ff8ea3",
    "dbdce0c552mshfe1af789924d51dp1db0dajsnafb2fb9eea95",
  ];
  
  const handleDownload = async () => {
    const videoId = extractYouTubeID(videoUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }
  
    setLoading(true);
    let success = false;
  
    for (const apiKey of API_KEYS) {
      const options = {
        method: "GET",
        url: "https://youtube-video-and-shorts-downloader.p.rapidapi.com/download.php",
        params: { id: videoId },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "youtube-video-and-shorts-downloader.p.rapidapi.com",
        },
      };
  
      try {
        const response = await axios.request(options);
        if (response.data?.results) {
          setDownloadLinks(response.data.results);
          success = true;
          break;
        }
      } catch (error) {
        console.warn(`API key failed: ${apiKey}`, error?.response?.data || error.message);
      }
    }
  
    if (!success) {
      alert("All API keys failed or quota exceeded.");
    }
  
    setLoading(false);
  };
  
  const getQualityIndex = (quality) => {
    const map = {
      mp3: 0,
      "1080p": 1,
      "720p": 2,
      "480p": 3,
      "360p": 4,
      "240p": 5,
      "144p": 6,
    };
    return map[quality];
  };

  const handleQualityDownload = () => {
  const index = getQualityIndex(quality);
  const selectedUrl = downloadLinks?.[index]?.url;

  if (selectedUrl) {
    navigate("/download", {
      state: {
        url: selectedUrl,
        quality,
      },
    });
  } else {
    alert("Selected quality not available");
  }
};

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4 overflow-hidden text-white">
      {/* Decorative blurred gradients */}
      <div className="absolute w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 top-0 right-0 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-25 bottom-0 left-0 animate-pulse"></div>

      <motion.div
        className="w-full max-w-xl z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full p-6 shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
          <CardContent className="flex flex-col gap-6">
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-extrabold text-white tracking-wide">
                🚀 YouTube Video Downloader
              </h2>
              <p className="text-sm text-gray-300">
                Paste a YouTube video link to generate downloadable formats
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Label className="text-white text-sm">🎥 YouTube Link</Label>
              <Input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="bg-white/10 text-white placeholder:text-white/60 border border-white/30 focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex gap-2 mt-2">
                <Button
                  onClick={handleDownload}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white flex-1"
                >
                  {loading ? (
                    <>
                      <RefreshCcw className="animate-spin mr-2 h-4 w-4" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Get Download Links
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setVideoUrl("")}
                  className="border border-white/20 text-slate-800 hover:bg-white/10"
                >
                  Clear
                </Button>
              </div>
            </div>

            {downloadLinks && (
              <motion.div
                className="flex flex-col gap-4 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Label className="text-white text-sm">📽️ Choose Quality</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger className="bg-white/10 border border-white/30 text-white focus:ring-2 focus:ring-green-400">
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a2e] text-white border border-white/20 rounded-lg shadow-lg">
                    {["1080p", "720p", "480p", "360p", "240p", "144p", "mp3"].map((q) => (
                      <SelectItem value={q} key={q}>
                        {q}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleQualityDownload}
                  className="bg-green-500 hover:bg-green-600 text-white mt-2"
                >
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  Download {quality || "Video"}
                </Button>
              </motion.div>
            )}

            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-sm text-white/70 hover:text-slate-800"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default YouTubeDownloader;
