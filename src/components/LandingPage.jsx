import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DownloadCloud, Youtube, ThumbsUp } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-x-hidden pb-20">
      {/* Decorative Blurred Backgrounds */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-pink-500 rounded-full blur-2xl opacity-20 bottom-10 right-10"></div>

      {/* Hero Section */}
      <motion.div
        className="z-10 text-center max-w-3xl mx-auto pt-28 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          All-in-One Video Tools Hub 🎥
        </h1>
        <p className="text-xl text-white/80 mb-10">
          Download videos easily from any source. Fast. Reliable. Free.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Button
            onClick={() => navigate("/video-downloader")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-xl transition-all duration-300"
          >
            <DownloadCloud className="mr-2" /> Shorts Downloader
          </Button>
          <Button
            onClick={() => navigate("/youtube-downloader")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 text-lg rounded-xl transition-all duration-300"
          >
            <Youtube className="mr-2" /> YouTube Downloader
          </Button>
        </div>
      </motion.div>

      {/* Features Section */}
      <section className="mt-28 px-6 md:px-20 text-center">
        <motion.h2
          className="text-3xl font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Why Choose Us?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Fast Downloads",
              icon: <DownloadCloud size={40} />,
              desc: "Blazing fast downloads with support for HD quality.",
            },
            {
              title: "YouTube Support",
              icon: <Youtube size={40} />,
              desc: "Easily download from YouTube with just one click.",
            },
            {
              title: "User-Friendly",
              icon: <ThumbsUp size={40} />,
              desc: "Clean UI and smooth experience across all devices.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="text-pink-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="mt-32 px-6 md:px-20 text-center">
        <motion.h2
          className="text-3xl font-bold mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          What Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rahul",
              review:
                "Super simple and effective. I downloaded a lecture within seconds!",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Priya",
              review:
                "Love the YouTube download option. The UI is gorgeous and fast!",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
            {
              name: "Ankit",
              review:
                "Everything works flawlessly. This is now my go-to tool!",
              img: "https://randomuser.me/api/portraits/men/75.jpg",
            },
          ].map((user, i) => (
            <motion.div
              key={i}
              className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white"
              />
              <h4 className="font-semibold text-lg mb-1">{user.name}</h4>
              <p className="text-white/80 text-sm italic">"{user.review}"</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
