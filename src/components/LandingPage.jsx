import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center overflow-hidden p-4">
      {/* Decorative Blurred Backgrounds */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-2xl opacity-20 bottom-10 right-10"></div>

      <motion.div
        className="z-10 text-center max-w-xl w-full bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Welcome to the Tool Hub
        </h1>
        <p className="text-lg text-white/80 mb-8">
          Choose your destination to download videos quickly and easily.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button
            onClick={() => navigate("/video-downloader")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-xl transition-all duration-300"
          >
            Video Downloader
          </Button>
          <Button
            onClick={() => navigate("/youtube-downloader")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-xl transition-all duration-300"
          >
            YouTube Downloader
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
