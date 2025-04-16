import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";


// https://rapidapi.com/officialofun-C-wpfpix418/api/youtube-video-and-shorts-downloader/playground/apiendpoint_b4535862-4f2d-4648-bd0a-005c694c5e06
const YouTubeDownloader = () => {
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
      window.open(selectedUrl, "_blank");
    } else {
      alert("Selected quality not available");
    }

    const link = document.createElement("a");
    link.href = selectedUrl;
    link.download = `youtube-video-${quality}.mp4`; // just a suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
        {/* Decorative Blurred Backgrounds */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-30 top-10 right-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-2xl opacity-20 bottom-10 left-10"></div>
      <Card className="w-full max-w-xl p-6 shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white text-center">
            YouTube Video Downloader
          </h2>
          <Label className="text-white">Enter YouTube Link:</Label>
          <Input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=XYZ123"
            className="bg-white/10 text-white placeholder:text-white/60 border border-white/30"
          />
          <Button
            onClick={handleDownload}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Fetching..." : "Get Download Links"}
          </Button>

          {downloadLinks && (
            <div className="flex flex-col gap-3">
              <Label className="text-white">Choose Quality:</Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="bg-white/10 border border-white/30 text-white">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent className="bg-white/10 text-white">
                  {["1080p", "720p", "480p", "360p", "240p", "144p" , "mp3"].map(
                    (q) => (
                      <SelectItem value={q} key={q}>
                        {q}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <Button
                onClick={handleQualityDownload}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Download {quality}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeDownloader;
