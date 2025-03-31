import React, { useEffect, useRef, useState } from "react";
import ReelsSlider from "./components/ReelsSlider/ReelsSlider";
import HeroSection from "./components/HeroSection/HeroSection";
import PodcastSlider from "../Home/components/PodcastSlider/PodcastSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import React, { useEffect, useState, useRef } from "react";
import { FaPauseCircle } from "react-icons/fa";
import axiosApi from "../../../conf/app";
import { Image, Shimmer } from "react-shimmer";
// import axiosApi from "";

function Resources() {
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const [swipeEnabledSuccess, setSwipeEnabledSuccess] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [reelsData, setReelsData] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [sliderRef, setSliderRef] = useState(null);
  const videoRefs = useRef([]);

  const [reelsDataSuccess, setReelsDataSuccess] = useState([]);
  const [isDraggingSuccess, setIsDraggingSuccess] = useState(false);
  const [playingIndexSuccess, setPlayingIndexSuccess] = useState(null);
  const [sliderRefSuccess, setSliderRefSuccess] = useState(null);
  const videoRefsSuccess = useRef([]);
  const [reelPlaying, setReelPlaying] = useState(false);
  const [reelPlayingSuccess, setReelPlayingSuccess] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [isPlaying, setIsPlaying] = useState(true);
  //  const [isDragging, setIsDragging] = useState(false);
  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
    setIsPlaying(true);
    setTimeout(() => {
      document.getElementById("video-player").play();
    }, 300);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
    setIsPlaying(false);
  };
  const togglePlayPause = (e) => {
    e.stopPropagation();
    const video = document.getElementById("video-player");
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseDown = () => {
    setIsDragging(false);
  };

  const handleMouseMove = () => {
    setIsDragging(true);
  };

  const handleMouseUp = (videoUrl) => {
    if (!isDragging) {
      openModal(videoUrl);
    }
  };

  const fetchReels = async () => {
    setIsLoading(true);
    try {
      // Determine tag based on title

      const response = await axiosApi.get(`/content/search?tags=3`);
      setReelsData(response.data.data);
      const response2 = await axiosApi.get(`/website-configs/success-stories`);
      setReelsDataSuccess(response2.data.data);
    } catch (error) {
      setError("Failed to Load Resources");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  const handlePlayVideo = (index) => {
    if (playingIndex !== null && videoRefs.current[playingIndex]) {
      videoRefs.current[playingIndex].pause();
    }
    setPlayingIndex(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
    setReelPlaying(true); // Stop autoplay
    setSwipeEnabled(false); // Disable swipe when video is playing
  };

  const handlePauseVideo = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      setPlayingIndex(null);
    }
    setReelPlaying(false);
    setSwipeEnabled(true); // Enable swipe when video is paused
  };

  const handlePlayVideoSuccess = (index) => {
    if (
      playingIndexSuccess !== null &&
      videoRefsSuccess.current[playingIndexSuccess]
    ) {
      videoRefsSuccess.current[playingIndexSuccess].pause();
    }
    setPlayingIndexSuccess(index);
    if (videoRefsSuccess.current[index]) {
      videoRefsSuccess.current[index].play();
    }
    setSwipeEnabledSuccess(false); // Disable swipe for success stories
    setReelPlayingSuccess(true); // Stop autoplay
  };

  const handlePauseVideoSuccess = (index) => {
    if (videoRefsSuccess.current[index]) {
      videoRefsSuccess.current[index].pause();
      setPlayingIndexSuccess(null);
    }
    setSwipeEnabledSuccess(true); // Enable swipe for success stories
    setReelPlayingSuccess(false); // Stop autoplay
  };

  const settings = {
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    speed: 300,
    centerPadding: "10%", // Ensure previous and next reels are slightly visible
    infinite: true,
    autoplaySpeed: 1200,
    autoplay: !reelPlaying,
    focusOnSelect: true,
    swipe: swipeEnabled,
    beforeChange: () => {
      if (playingIndex !== null) {
        handlePauseVideo(playingIndex);
      }
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    },
    responsive: [
      {
        breakpoint: 1600, // Large Screens
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10%", // Ensures partial visibility of previous/next
        },
      },
      {
        breakpoint: 1024, // Tablets & Small Laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 768, // Mobile Devices
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "4%",
        },
      },
    ],
  };
  const settingsSuccess = {
    slidesToShow: 3, // Default for large screens
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    speed: 300,
    centerPadding: "10%", // Ensure previous and next reels are slightly visible
    infinite: true,
    autoplaySpeed: 1200,
    autoplay: !reelPlaying,
    focusOnSelect: true,
    swipe: swipeEnabled,
    beforeChange: () => {
      if (playingIndex !== null) {
        handlePauseVideo(playingIndex);
      }
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    },
    responsive: [
      {
        breakpoint: 1600, // Large Screens
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10%", // Ensures partial visibility of previous/next
        },
      },
      {
        breakpoint: 1024, // Tablets & Small Laptops
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 768, // Mobile Devices
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "4%",
        },
      },
    ],
  };

  useEffect(() => {
    settings.autoplay = !reelPlaying;
    settingsSuccess.autoplay = !reelPlayingSuccess;
  }, [reelPlaying, setReelPlaying]);
  return (
    <>
      {error ? (
        <div className="text-center flex flex-col justify-center items-center h-[80vh] w-full ">
          <h1 className="text-3xl">{error}</h1>
          <Link to={"/"}>
            <button className="px-5 py-2 bg-cyan-400 text-black mt-4 rounded-full">
              Go Back
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <HeroSection />
          <div className=" lg:px-10 px-6 xl:px-16">
            <div className="container w-full  h-[1px] mx-auto bg-gray-400 opacity-30 relative"></div>
          </div>
          <PodcastSlider title={"PODCASTS"} />

          {/* <ReelsSlider title={"Reels"} /> */}
          {reelsData && reelsData.length > 0 ? (
            <div className="w-full bg-black/95 pb-1">
              {/* Title */}
              <h2 className="text-[#5DC9DE] text-2xl font-bold uppercase drop-shadow-[0_0_20px_white] text-center">
                reels
              </h2>

              {/* Slider Container */}
              <div className="reels-slider">
                <Slider ref={setSliderRef} {...settings}>
                  {reelsData.map((reel, index) => (
                    <div key={reel.id} className="px-2 slick-slide w-5">
                      <div
                        className="relative overflow-hidden rounded-xl cursor-pointer"
                        style={{ aspectRatio: "3/4.5" }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={() => handleMouseUp(reel.video_file_url)}
                      >
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src={reel.thumbnails[0]}
                            fallback={<Shimmer width={300} height={400} />}
                            alt={reel.name}
                            NativeImgProps={{
                              className: "w-full h-full object-cover",
                            }}
                          />
                        </div>

                        {/* Play button positioned at the center */}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                          <img
                            src="/assets/images/playButton.png"
                            alt="Play"
                            className="w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                          />

                          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                                <path d="M8 5v14l11-7z" />
                              </svg> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : (
            ""
          )}
          {/* <ReelsSlider title={"Success Stories"} /> */}
          {reelsDataSuccess && reelsDataSuccess.length > 0 ? (
            <div className="w-full bg-black/95 pb-1">
              {/* Title */}
              <h2 className="text-[#5DC9DE] text-2xl font-bold uppercase drop-shadow-[0_0_20px_white] text-center">
                SUCCESS STORIES
              </h2>

              {/* Slider Container */}
              <div className="reels-slider">
                <Slider ref={setSliderRef} {...settingsSuccess}>
                  {reelsDataSuccess.map((reel, index) => (
                    <div key={reel.id} className="px-2 slick-slide">
                      <div
                        className="relative overflow-hidden rounded-xl cursor-pointer"
                        style={{ aspectRatio: "3/4.5" }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={() => handleMouseUp(reel.video_file_url)}
                      >
                        <div className="w-full h-full rounded-xl overflow-hidden">
                          <Image
                            src={reel.thumbnails[0]}
                            fallback={<Shimmer width={300} height={400} />}
                            alt={reel.name}
                            NativeImgProps={{
                              className: "w-full h-full object-cover",
                            }}
                          />
                        </div>

                        {/* Play button positioned at the center */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                          <img
                            src="/assets/images/playButton.png"
                            alt="Play"
                            className="w-20 h-20 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-20 lg:h-20"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : (
            ""
          )}
          

          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              onClick={closeModal}
            >
              <div
                className="relative bg-black rounded-lg shadow-lg  max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-0 right-0  text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl z-50 font-bold shadow-lg"
                  onClick={closeModal}
                >
                  &times;
                </button>

                <div className="relative">
                  <video
                    id="video-player"
                    src={selectedVideo}
                    className="w-full h-auto rounded-lg"
                    autoPlay
                    playsInline
                  />
                  {!isPlaying && (
                    <button
                      onClick={togglePlayPause}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-6xl rounded-full w-20 h-20 mx-auto my-auto"
                    >
                      ▶
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Resources;
