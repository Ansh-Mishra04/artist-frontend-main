import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import axiosApi from "../../../../../conf/app";
import PlayButton from "../../../../../../public/assets/images/play_button.png";
import { Link, useNavigate } from "react-router-dom";
import { Image, Shimmer } from "react-shimmer";

function PodcastSlider({ title }) {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [podcastData, setPodcastData] = useState([]);
  const [contentData, setContentData] = useState(null);
  const [playingIndex, setPlayingIndex] = useState(null);
  const videoRefs = useRef([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: false,
    arrows: false,
    centerMode: true,
    centerPadding: "15%",
    beforeChange: () => setIsDragging(true),
    afterChange: () => {
      setIsDragging(false);
      stopAllVideos(); // Stop video when slider moves
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerPadding: "12%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "6%",
        },
      },
    ],
  };

  const fetchContents = async () => {
    try {
      const response = await axiosApi.get("/content/search?tags=1");
      setPodcastData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchContents();
  }, []);

  const formatListeners = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M Listeners`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K Listeners`;
    }
    return `${views}+ Listeners`;
  };

  const handlePlayPauseVideo = (index) => {
    if (isDragging) return; // Prevent playing while dragging

    // Pause the currently playing video if it's different
    if (
      playingIndex !== null &&
      playingIndex !== index &&
      videoRefs.current[playingIndex]
    ) {
      videoRefs.current[playingIndex].pause();
      videoRefs.current[playingIndex].currentTime = 0; // Reset the video to the beginning
    }

    // Toggle play/pause for the clicked video
    if (playingIndex === index) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0; // Reset the video to the beginning
      setPlayingIndex(null);
    } else {
      setPlayingIndex(index);
      if (videoRefs.current[index]) {
        videoRefs.current[index].play();
      }
    }
  };

  const stopAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
    setPlayingIndex(null);
  };

  return (
    <div className="bg-black text-white py-7">
      <div className="container mx-auto mb-12 px-4 lg:px-16">
        {title ? (
          <h2 className="text-[#5DC9DE] text-2xl font-bold uppercase drop-shadow-[0_0_20px_white] text-center">
            {title}
          </h2>
        ) : (
          <h1 className="text-xl lg:text-4xl font-bold text-center mb-8 leading-tight uppercase mt-2">
            Learn, trust – Join, Artist First,
            <br />
            <span className="text-[#5DC9DE]">
              Collaboration over Competition
            </span>
          </h1>
        )}
      </div>

      <div className="podcast-slider mx-auto">
        <Slider {...settings}>
          {podcastData.map((podcast, index) => (
            <div key={index} className="px-2 lg:px-4 w-full">
              <div className="rounded-xl overflow-hidden relative">
                {playingIndex === index ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    autoPlay
                    src={podcast.video_file_url}
                    controls
                    className="w-[90%] h-[100px] sm:h-[400px] object-cover rounded-xl" // Reduced width
                    onEnded={() => setPlayingIndex(null)}
                    onClick={() => handlePlayPauseVideo(index)}
                  />
                ) : (
                  <div className="relative cursor-pointer">
                    <div className="w-full h-[100px] sm:h-[400px]">
                      <Image
                        src={podcast.thumbnails[0]}
                        fallback={<Shimmer width={100} height={400} />}
                        alt={podcast.name}
                        NativeImgProps={{
                          className: "w-[90%] h-full object-cover rounded-xl", // Reduced width
                        }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                      onClick={() => handlePlayPauseVideo(index)}
                    >
                      <img
                        src={PlayButton}
                        className="w-[80px] sm:w-[150px]"
                        alt="Play Button"
                      />
                    </div>
                  </div>
                )}
                {/* {playingIndex === index && (
                  <div
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={() => handlePlayPauseVideo(index)}
                  >
                    <FaPauseCircle className="text-4xl text-white opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                )} */}
              </div>

              <div className="p-4 sm:p-6 text-center">
                <Link to={`/content/${podcast.id}`}>
                  <h3 className="text-xl font-semibold mb-2 hover:text-[#5DC9DE] hover:cursor-pointer ">
                    {podcast.name}
                  </h3>
                </Link>
                <div className="text-gray-400 text-sm sm:text-base">
                  <span>{podcast.artist_name}</span>
                  <span className="mx-2">—</span>
                  <span>{podcast.duration_in_minutes || "--"} min</span>
                  <span className="mx-2">—</span>
                  <span>{formatListeners(podcast.total_views)}</span>
                  <br />
                  <span>{podcast.credit_name || ""}</span>
                  <span>
                    {podcast.keywords?.map((keyword, index) => (
                      <span key={index}>{keyword}</span>
                    )) }
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="text-center mt-6 relative z-10 mb-4">
          <a
            href={import.meta.env.VITE_PORTAL_URL + "/auth/signup"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#5DC9DE] text-black font-semibold py-3 px-8 rounded-full hover:font-bold transition delay-300 pointer-events-auto"
            onClick={() => {
              window.open(
                import.meta.env.VITE_PORTAL_URL + "/auth/signup",
                "_blank",
                "noopener,noreferrer"
              );
            }}
            onTouchEnd={() => {
              window.open(
                import.meta.env.VITE_PORTAL_URL + "/auth/signup",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            COMMUNITY PLATFORM – SIGN UP
          </a>
        </div>
      </div>
    </div>
  );
}

export default PodcastSlider;
