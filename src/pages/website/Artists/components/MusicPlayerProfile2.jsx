import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "./TopPicksSection.css";
import { useSelector } from "react-redux";
import { FaPlay, FaPause } from "react-icons/fa";
import { Image, Shimmer } from "react-shimmer";
import { useNavigate } from "react-router-dom";
import arrowLeftIc from "/assets/images/arrowLeftIc.svg";
import arrowRightIc from "/assets/images/arrowRightIc.svg";

const MusicPlayerProfile2 = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null); // Create a ref for the slider

  const artistData = useSelector((state) => state.topPick.topPicks);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audio, setAudio] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  const handlePlayPause = (song) => {
    if (audio && playingSongId === song.id) {
      if (!audio.paused) {
        audio.pause();
        setPlayingSongId(null);
      } else {
        audio.play();
        setPlayingSongId(song.id);
      }
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(song.audio_file_url);
      newAudio.play();
      setAudio(newAudio);
      setCurrentAudio(song.audio_file_url);
      setPlayingSongId(song.id);

      newAudio.onended = () => {
        setPlayingSongId(null);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause(); 
        setPlayingSongId(null); 
      }
    };
  }, [audio]); // The cleanup runs when the audio changes or when the component unmounts

  function rankToColor(rank) {
    const val = {
      1: "bg-emerald-400",
      2: "bg-amber-400",
      3: "bg-sky-400",
      4: "bg-rose-400",
      5: "bg-fuchsia-400",
    };
    return val[(rank % 5) + 1];
  }

  return artistData.length > 0 ? (
    <div className="toppicks-section xl:px-16 pt-20 pb-14 bg-black z-20 relative text-white over lg:px-10 px-6">
      <div className="mx-auto">
        <div className="flex justify-between">
          <div>
            <h2 className="text-4xl font-bold text-left mb-2">
              <span className="text-[#5DC9DE]">LEADING ARTISTS </span> OF THE SPOTLIGHT
            </h2>
            <p className="text-gray-400 text-left mb-12">
              The artists are grabbing every opportunity and rising as the stars of tomorrow. What are you waiting for? 
            </p>
          </div>
          <div className="sm:pe-4 ms-5 sm:ms-0 py-4 lg:py-0">
            <button
              onClick={() => sliderRef.current.slickPrev()} // Use slickPrev()
              className="z-10 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors mr-2"
            >
              <img
                src={arrowLeftIc}
                alt="Previous"
                className="w-[20px] h-[20px]"
              />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()} // Use slickNext()
              className="z-10 bg-[#6F4FA0] mt-3 lg:mt-0 p-2 rounded-full hover:bg-[#6F4FA0] transition-colors"
            >
              <img
                src={arrowRightIc}
                alt="Next"
                className="w-[20px] h-[20px]"
              />
            </button>
          </div>
        </div>

        {/* Add ref to the Slider component */}
        <Slider ref={sliderRef} {...settings} className="gap-6">
          {artistData &&
            artistData.map((artist, index) => (
              <div
                key={index}
                className="lg:px-4 px-5 py-5 max-w-full sm:max-w-[95%]"
              >
                <div className="relative overflow-visible rounded-xl">
                  <div
                    className={`absolute left-[-10px] top-[-10px] z-10 ${rankToColor(
                      artist.rank
                    )} w-16 h-16 flex items-center justify-center rounded-lg -rotate-12`}
                  >
                    <span className="text-black text-4xl font-bold">
                      {artist.rank}
                    </span>
                  </div>

                  <div
                    className="relative h-64 hover:cursor-pointer"
                    onClick={() => navigate(`/artists/${artist.id}`)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                    <Image
                      src={artist.profile_img_url}
                      fallback={<Shimmer width="100%" height="100%" />}
                      alt={artist.name}
                      NativeImgProps={{
                        className: "w-full h-full object-cover",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-2xl drop-shadow-[0_0_20px_white] font-bold mb-1">{artist.name}</h3>
                      <p className="text-sm text-gray-500">
                        Stage Name:{" "}
                        <span className="text-[#5DC9DE]">
                          {artist.stage_name}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="xl:p-6">
                    {artist.songs.slice(0, 5).map((song, songIndex) => (
                      <div
                        key={song.id}
                        className="flex items-center z-40 justify-between py-3 border-b border-gray-800 last:border-0"
                      >
                        <div>
                          <div className="flex items-center gap-4">
                            <span className="text-gray-500">
                              {songIndex < 10
                                ? "0" + (songIndex + 1)
                                : songIndex}
                            </span>
                            <div>
                              <h4 className="font-semibold">{song.name}</h4>
                              <p className="text-sm text-gray-400">
                                {song.featuring_artists.join(", ")}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          className="min-w-[35px] w-[35px] min-h-[35px] h-[35px] flex-shrink-0 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-300 transition-colors ml-4"
                          onClick={() => handlePlayPause(song)}
                        >
                          {playingSongId === song.id && !audio?.paused ? (
                            <FaPause className="text-black " size={11} />
                          ) : (
                            <FaPlay
                              className="text-black ml-[0.5px]"
                              size={11}
                            />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  ) : (
    <div className="bg-black text-white min-h-screen py-14">
      <div className="container mx-auto">
        {/* <Shimmer width={300} height={600} /> */}
      </div>
    </div>
  );
};

export default MusicPlayerProfile2;
