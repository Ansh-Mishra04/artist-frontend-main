import React, { useEffect, useRef, useState } from "react";
import ReelsSlider from "./components/ReelsSlider/ReelsSlider";
import HeroSection from "./components/HeroSection/HeroSection";
import PodcastSlider from "../Home/components/PodcastSlider/PodcastSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaPauseCircle } from "react-icons/fa";
import axiosApi from "../../../conf/app";
import { Image, Shimmer } from "react-shimmer";
import { Link } from "react-router-dom";

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
  const videoPlayerRef = useRef(null);

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

  // Separate move counters for each slider
  let moveCount = 0;
  let moveCountSuccess = 0;

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
    setIsPlaying(true);
    // Use ref instead of getElementById
    setTimeout(() => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.play().catch((err) => {
          console.error("Video play error:", err);
          setIsPlaying(false);
        });
      }
    }, 300);
  };

  const closeModal = () => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pause();
    }
    setIsModalOpen(false);
    setSelectedVideo("");
    setIsPlaying(false);
  };

  const togglePlayPause = (e) => {
    e.stopPropagation();
    if (!videoPlayerRef.current) return;

    if (videoPlayerRef.current.paused) {
      videoPlayerRef.current.play();
      setIsPlaying(true);
    } else {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    }
  };

  // REELS SPECIFIC HANDLERS
  const handleMouseDownReels = () => {
    setIsDragging(false);
  };

  const handleMouseMoveReels = () => {
    moveCount++;
    if (moveCount > 5) {
      // Higher threshold to prevent false drags
      setIsDragging(true);
    }
  };

  const handleMouseUpReels = (videoUrl) => {
    // Use a small timeout to ensure drag state is updated
    setTimeout(() => {
      if (!isDragging) {
        openModal(videoUrl);
      }
      moveCount = 0; // Reset the counter
    }, 10);
  };

  // SUCCESS STORIES SPECIFIC HANDLERS
  const handleMouseDownSuccess = () => {
    setIsDraggingSuccess(false);
  };

  const handleMouseMoveSuccess = () => {
    moveCountSuccess++;
    if (moveCountSuccess > 5) {
      setIsDraggingSuccess(true);
    }
  };

  const handleMouseUpSuccess = (videoUrl) => {
    // Use a small timeout to ensure drag state is updated
    setTimeout(() => {
      if (!isDraggingSuccess) {
        openModal(videoUrl);
      }
      moveCountSuccess = 0; // Reset the counter
    }, 10);
  };

  const fetchReels = async () => {
    setIsLoading(true);
    try {
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
    setReelPlaying(true);
    setSwipeEnabled(false);
  };

  const handlePauseVideo = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      setPlayingIndex(null);
    }
    setReelPlaying(false);
    setSwipeEnabled(true);
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
    setSwipeEnabledSuccess(false);
    setReelPlayingSuccess(true);
  };

  const handlePauseVideoSuccess = (index) => {
    if (videoRefsSuccess.current[index]) {
      videoRefsSuccess.current[index].pause();
      setPlayingIndexSuccess(null);
    }
    setSwipeEnabledSuccess(true);
    setReelPlayingSuccess(false);
  };

  // IMPROVED SETTINGS FOR REELS SLIDER
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    speed: 700, // Increased for smoother transitions
    centerPadding: "10%",
    infinite: true,
    autoplaySpeed: 3000, // Increased to reduce frequency
    autoplay: !reelPlaying,
    focusOnSelect: false,
    swipe: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Smoother easing function
    touchThreshold: 10, // More lenient touch handling
    waitForAnimate: true, // Complete animations before responding to new input
    pauseOnHover: true,
    pauseOnFocus: true,
    beforeChange: (current, next) => {
      if (playingIndex !== null) {
        handlePauseVideo(playingIndex);
      }
      // Mark as dragging
      setIsDragging(true);
    },
    afterChange: () => {
      // Add a small delay before setting isDragging to false
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    },
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "15%",
        },
      },
    ],
  };

  // IMPROVED SETTINGS FOR SUCCESS STORIES SLIDER
  const settingsSuccess = {
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    dots: false,
    speed: 700, // Same improvements as above slider
    centerPadding: "10%",
    infinite: true,
    autoplaySpeed: 3000,
    autoplay: !reelPlayingSuccess,
    focusOnSelect: false,
    swipe: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    touchThreshold: 10,
    waitForAnimate: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    beforeChange: (current, next) => {
      if (playingIndexSuccess !== null) {
        handlePauseVideoSuccess(playingIndexSuccess);
      }
      setIsDraggingSuccess(true);
    },
    afterChange: () => {
      setTimeout(() => {
        setIsDraggingSuccess(false);
      }, 50);
    },
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "15%",
        },
      },
    ],
  };

  useEffect(() => {
    settings.autoplay = !reelPlaying;
    settingsSuccess.autoplay = !reelPlayingSuccess;
  }, [reelPlaying, reelPlayingSuccess]);

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
          <PodcastSlider
            title={"PODCASTS"}
            titleClassName="text-[#5DC9DE] text-3xl font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-center pt-3 mb-6 tracking-wide"
            sliderClassName="w-full bg-black/95 pb-1 mt-12"
          />

          {reelsData && reelsData.length > 0 ? (
            <div className="w-full bg-black/95 pb-1 mt-12">
              <h2 className="text-[#5DC9DE] text-3xl font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-center pt-3 mb-6 tracking-wide">
                REELS
              </h2>

              <div className="reels-slider">
                <Slider ref={setSliderRef} {...settings}>
                  {reelsData.map((reel, index) => (
                    <div key={reel.id} className="px-2 py-4 slick-slide ">
                      <div
                        className="relative overflow-hidden rounded-xl cursor-pointer"
                        style={{
                          aspectRatio: "3/4",
                          maxWidth: "95%",
                          margin: "0 auto",
                        }}
                        onMouseDown={handleMouseDownReels} // CHANGED
                        onMouseMove={handleMouseMoveReels} /* CHANGED */
                        onMouseUp={() =>
                          handleMouseUpReels(reel.video_file_url)
                        } // CHANGED
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

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                          <img
                            src="/assets/images/playButton.png"
                            alt="Play"
                            className="w-16 h-16 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                          />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 px-3">
                          <p className="text-white font-medium text-center truncate">
                            {reel.artist_name || reel.created_by || reel.name}
                          </p>
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

          {reelsDataSuccess && reelsDataSuccess.length > 0 ? (
            <div className="w-full bg-black/95 pb-1 mt-16">
              <h2 className="text-[#5DC9DE] text-3xl font-bold uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] text-center pt-3 mb-6 tracking-wide">
                SUCCESS STORIES
              </h2>

              <div className="reels-slider">
                <Slider ref={setSliderRefSuccess} {...settingsSuccess}>
                  {reelsDataSuccess.map((reel, index) => (
                    <div key={reel.id} className="px-2 py-4 slick-slide">
                      <div
                        className="relative overflow-hidden rounded-xl cursor-pointer"
                        style={{
                          aspectRatio: "3/4",
                          maxWidth: "95%",
                          margin: "0 auto",
                        }}
                        onMouseDown={handleMouseDownSuccess} // CHANGED
                        onMouseMove={handleMouseMoveSuccess} // CHANGED
                        onMouseUp={() =>
                          handleMouseUpSuccess(reel.video_file_url)
                        } // CHANGED
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

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center">
                          <img
                            src="/assets/images/playButton.png"
                            alt="Play"
                            className="w-20 h-20 sm:w-12 sm:h-12 md:w-20 md:h-20 lg:w-20 lg:h-20"
                          />
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-4 px-3">
                          <p className="text-white font-medium text-center truncate">
                            {reel.artist_name || reel.created_by || reel.name}
                          </p>
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
                className="relative bg-black rounded-lg shadow-lg max-w-3xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-0 right-0 text-white w-12 h-12 rounded-full flex items-center justify-center text-3xl z-50 font-bold shadow-lg"
                  onClick={closeModal}
                >
                  &times;
                </button>

                <div className="relative">
                  <video
                    id="video-player"
                    ref={videoPlayerRef}
                    src={selectedVideo}
                    className="w-full h-auto rounded-lg"
                    autoPlay
                    playsInline
                    controls
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
