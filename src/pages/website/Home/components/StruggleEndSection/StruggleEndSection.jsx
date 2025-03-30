import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosApi from "../../../../../conf/app.js";
import { FaPlay,FaPause } from "react-icons/fa";
import Music2 from "../../../../../../public/assets/images/music2.png";
import Elipse from "../../../../../../public/assets/images/elipse.png";
import { Link } from "react-router-dom";

const StruggleEndsSection = () => {
  const [highlightedStory, setHighlightedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState(null);

  useEffect(() => {
    const fetchHighlightedStory = async () => {
      try {
        const response = await axiosApi.get('/website-configs/highlighted-story');
        setHighlightedStory(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedStory();
  }, []);



  const formatListeners = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M Listeners`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K Listeners`;
    }
    return `${views} Listeners`;
  };

  const handlePlayPause = () => {
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play();
        setIsPlaying(true);
      } else {
        videoElement.pause();
        setIsPlaying(false);
      }
    }
  };
  

  if (loading) return <div className="bg-black text-white py-16 px-4">Loading...</div>;
  // if (error) return <div className="bg-black text-white py-16 px-4">Error: {error}</div>;
  // if (!highlightedStory) return <div className="bg-black text-white py-16 px-4">No highlighted story available</div>;

  return (
    highlightedStory && <div className="bg-black relative text-white relaive  ">
    <img src={Music2} className="absolute z-30 right-0 w-[300px]" alt="" />
    <img src={Elipse} className="absolute z-30 right-0 -top-[300px] w-[400px]" alt="" />
    <div className="container pt-16 px-4 md:px-16 lg:px-16 ">
      <div className="mb-3 relative ">
        <h2 className="text-3xl  lg:text-5xl font-bold mb-2">
          YOUR <span className="text-[#5DC9DE]">STRUGGLE ENDS HERE!</span>
        </h2>
        <p className="text-gray-400 max-w-2xl">
        Just trust yourself and this community platform, focus on your music creativity, and leave the rest to us.
        </p>
      </div>


      {/* Artist Profile Card */}
      <div className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 items-center p-6 md:p-0">
          {/* Left Video Section */}
          <div className="relative group">
            <video
              ref={setVideoElement}
              src={highlightedStory.video_file_url}
              className="w-full h-[300px] sm:h-[400px] rounded-xl object-cover aspect-[4/3]"
              poster={highlightedStory.thumbnails?.[0] || "/assets/images/struggleSectionThumbnail.png"}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button
  className="rounded-full p-4 transition-colors"
  onClick={handlePlayPause}
  onTouchEnd={(e) => {
    e.preventDefault(); // Prevents unwanted double-tap zoom behavior
    handlePlayPause();
  }}
>
  {isPlaying ? (
    <FaPause className="text-white text-2xl" />
  ) : (
    <img
      src="/assets/images/playButton.png"
      alt="Play"
      className="w-25 h-25 opacity-80 hover:opacity-100 transition-opacity"
    />
  )}
</button>
            </div>
          </div>

          {/* Right Content Section */}
          <div className="space-y-4">
            {/* <h1>{highlightedStory}</h1> */}
            <Link to={`/artists/${highlightedStory.id}`}>
            <h1 className="text-3xl text-white font-semibold">{highlightedStory.name}</h1>
            </Link>
            <h3 className="text-3xl font-bold">{highlightedStory.artist_name}</h3>

            <div className="space-y-1">
              <p className="text-gray-400">
                Stage Name: <span className="text-[#5DC9DE]">{highlightedStory.stage_name}</span>
              </p>
              <p className="font-bold" style={{ color: "#6F4FA0" }}>
                {highlightedStory.total_songs} Songs — {formatListeners(highlightedStory.total_views)}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-gray-400">
                {highlightedStory.highlighted_desc || "No description available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  );
};

export default StruggleEndsSection;
