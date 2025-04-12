import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosApi from "../../../../conf/app";
import { FaPause, FaPlay } from "react-icons/fa";
import Face from "../../../../../public/assets/images/facebook.png";
import Twitter from "../../../../../public/assets/images/twitter.png";
import Linkedin from "../../../../../public/assets/images/linkedin.png";
import Insta from "../../../../../public/assets/images/instagram.png";
import Story from "../../../../../public/assets/images/story.png";
import { useSelector } from "react-redux";
import { IoIosArrowRoundDown } from "react-icons/io";
const MusicPlayerProfile = () => {
  const [artist, setArtist] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [videoElement, setVideoElement] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [audio, setAudio] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayingVid, setIsPlayingVid] = useState(false);
  const videoRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };
  const handleDownload = async () => {
    if (selectedImage) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg"); // This will open the "Save As" dialog
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to download image:", error);
      }
    }
  };
  const [rankedArtists, setRankedArtists] = useState([]);
  // const rankedArtists = useSelector((state) => state.topPick.topPicks);

  const fetchIndividualArtist = async () => {
    setIsLoading(true);
    try {
      const response = await axiosApi.get(`/artists/${id}`);
      setArtist(response.data.data);
      console.log(artist);
    } catch (err) {
      console.log(err);
      setError("Artist Not Found");
    } finally {
      setIsLoading(false);
    }

    // console.log(JSON.stringify(artist));
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = (e) => {
    e.preventDefault(); // prevents navigation
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handlePlayPauseVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setShowButton(false); // Hide button when playing
      } else {
        videoRef.current.pause();
        setShowButton(true); // Show button when paused
      }
      setIsPlaying(!videoRef.current.paused);
    }
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

  const fetchRankedArtists = async () => {
    const response = await axiosApi.get(
      `/artists/search?q=${artist.profession}`
    );
    setRankedArtists(
      response.data.data.filter((data) => data.id != id).slice(0, 8)
    );
  };
  const formatListeners = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M+ Listeners`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K+ Listeners`;
    }
    return `${views} Listeners`;
  };
  useEffect(() => {
    fetchRankedArtists();
    fetchIndividualArtist();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);
  const handleSongDownload = (song, name) => {
    const link = document.createElement("a");
    console.log(name);

    link.href = song.audio_file_url; // Ensure the URL is correct and accessible
    link.setAttribute("download", name || "song.mp3"); // Set a default file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      {isLoading && (
        <div className="text-center h-[90vh] w-full  py-32">
          <div className="animate-spin rounded-full w-12 h-12  border-b-2 border-[#5DC9DE] mx-auto"></div>
          <p className="mt-2 text-[#5DC9DE]">
            🎶 "Tuning the strings... your music is on its way!" 🎵
          </p>
        </div>
      )}
      {error && (
        <div className="text-center flex flex-col justify-center items-center h-[80vh] w-full ">
          <h1 className="text-3xl">ERROR 404 PAGE NOT FOUND</h1>
          <Link to={"/"}>
            <button className="px-5 py-2 bg-[#5DC9DE] text-black mt-4 rounded-full">
              Go Back
            </button>
          </Link>
        </div>
      )}
      {!isLoading && !error && artist && artist.name && (
        <div className="relative  text-white    min-h-screen">
          {/* Background with gradient */}
          <div
            className="absolute inset-0  bg-black"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 1) 100%), url(${artist.photos[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "90vh",
            }}
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
          {/* Solid black overlay for bottom half */}

          {/* Content */}
          <div className="relative z-50 container px-6 xl:px-16 lg:px-10 mx-auto pt-[120px] sm:pt-[200px]">
            {/* Name Header */}
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-4 ">
              {artist.name}
            </h1>
            <p className="my-4">
              Stage Name:
              <span className="text-[#5DC9DE]"> {artist.stage_name}</span>
            </p>

            {/* Profile Section */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="w-full sm:col-span-1 col-span-3 h-full relative">
                <div className="relative group">
                  <video
                    ref={videoRef}
                    src={artist.video_bio}
                    className="w-full rounded-xl object-cover overflow-hidden aspect-[4/3] cursor-pointer"
                    poster={
                      artist.profile_img_url ||
                      "/assets/images/struggleSectionThumbnail.png"
                    }
                    onClick={handlePlayPauseVideo} // Click on video to play/pause
                    onPlay={() => setShowButton(false)} // Hide button on play
                    onPause={() => setShowButton(true)} // Show button on pause
                  />
                  {/* Play Button Overlay */}
                  {showButton && (
                    <div className="absolute overflow-hidden rounded-xl inset-0 flex items-center justify-center bg-black/30">
                      <button
                        className="rounded-full p-4 bg-[#5DC9DE] hover:bg-cyan-300 transition-colors"
                        onClick={handlePlayPauseVideo}
                      >
                        <FaPlay className="text-white text-2xl" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col col-span-3 sm:col-span-2">
                <p className="text-gray-400 mb-2">
                  Profession:{" "}
                  <span className="font-bold text-white">
                    {artist.profession}
                  </span>
                </p>
                <p className="text-gray-400 mb-2">
                  Location:{" "}
                  <span className="font-bold text-white">
                    {artist.location}
                  </span>
                </p>
                <p className="text-primary mb-2 font-bold">
                  {artist.total_content} Songs —{" "}
                  {formatListeners(artist.total_views)}
                </p>
                <p className="text-gray-400 mb-6">{artist.bio}</p>

                <div className="flex justify-center sm:justify-normal gap-4">
                  <a
                    href={artist.facebook_url}
                    className="text-white hover:text-white"
                  >
                    <img
                      src={Face}
                      alt="Social"
                      className="opacity-70 w-10 h-10 object-cover hover:opacity-100"
                    />
                  </a>
                  <a
                    href={artist.instagram_url}
                    className="text-white w-10 h-10 object-cover hover:text-white"
                  >
                    <img
                      src={Insta}
                      alt="Social"
                      className="opacity-70 hover:opacity-100"
                    />
                  </a>
                  <a
                    href={artist.linkedin_url}
                    className="text-white w-10 h-10 object-cover hover:text-white"
                  >
                    <img
                      src={Linkedin}
                      alt="Social"
                      className="opacity-70 hover:opacity-100"
                    />
                  </a>
                  <a
                    href={artist.twitter_url}
                    className="text-white hover:text-white"
                  >
                    <img
                      src={Twitter}
                      alt="Social"
                      className="opacity-70 w-10 h-10 object-cover hover:opacity-100"
                    />
                  </a>

                  <div>
                    {artist?.story_url ? (
                      <>
                        {/* Image trigger */}
                        <a
                          href={artist.story_url}
                          className="text-white hover:text-white"
                          onClick={handleModalOpen}
                        >
                          <img
                            src={Story}
                            alt="Social"
                            className="opacity-70 w-10 h-10 object-cover hover:opacity-100"
                          />
                        </a>

                        {/* Modal */}
                        {isOpen && (
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                            <div className="relative w-[90%] max-w-2xl bg-white rounded-2xl shadow-xl p-4">
                              {/* Close button */}
                              <button
                                onClick={handleModalClose}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                              >
                                &times;
                              </button>

                              {/* Video */}
                              <div className="aspect-w-16 aspect-h-9">
                                <video
                                  controls
                                  autoPlay
                                  className="w-full h-full rounded-lg"
                                >
                                  <source
                                    src={artist.story_url}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <button className="disabled opacity-50 cursor-not-allowed">
                        <img
                          src={Story}
                          alt="Social"
                          className="opacity-70 w-10 h-10 object-cover hover:opacity-50"
                        />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Songs Table */}
            <table className="w-full mb-12">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="text-left pb-4">#</th>
                  <th className="text-left pb-4 relative left-4">
                    SONG'S NAME
                  </th>
                  <th className="text-left pb-4">PLAYS</th>
                  <th className="text-center pb-4 ">TIME</th>
                  <th className="text-center pb-4 ">PLAY</th>
                  <th className="text-center pb-4 ">DOWNLOAD</th>
                </tr>
              </thead>
              <tbody>
                {artist &&
                  artist.songs.map((song, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-800 hover:bg-gray-800/50 text-sm lg:text-lg"
                    >
                      <td className="py-4">{index + 1}</td>
                      <td className="py-4">
                        <div className="ms-5 ">
                          <div className="font-medium  ">{song.name}</div>
                          <div className="text-gray-400 text-xs lg:text-sm ">
                            {song.primary_artist}
                          </div>
                        </div>
                      </td>
                      <td className="py-4">{song.total_views}</td>
                      <td className="py-4 text-center ">
                        {song.duration_in_minutes}
                      </td>
                      {/* <td className="py-4">
                  <img
                    src="/api/placeholder/24/24"
                    alt="Play"
                    className="cursor-pointer hover:opacity-80"
                  />
                </td> */}
                      <td className="py-4 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#6F4FA0] ml-4"
                            onClick={() => handlePlayPause(song)}
                          >
                            {playingSongId === song.id && !audio?.paused ? (
                              <FaPause className="text-white" size={13} />
                            ) : (
                              <FaPlay className="text-white ml-1" size={13} />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            className="min-w-[30px] w-[30px] min-h-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#5DC9DE] ml-4"
                            onClick={() => handleSongDownload(song, song.name)}
                          >
                            <IoIosArrowRoundDown className="text-black" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* Image Gallery */}
            <div className="grid grid-cols-4 h-auto gap-4">
              {artist &&
                artist.photos.slice(1).map((src, index) => (
                  <div key={index + 1} className="aspect-square">
                    <img
                      src={src}
                      alt={`Gallery image ${index + 2}`}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleImageClick(src)}
                    />
                  </div>
                ))}
            </div>

            {selectedImage && (
              <div className="fixed inset-0 bg-black pb-6  bg-opacity-70 flex items-center justify-center z-50">
                <div className="relative   p-4 rounded-lg max-w-[90%] max-h-[90%]">
                  <button
                    className="absolute top-2 right-2 text-white text-2xl bg-black rounded-full w-8 h-8 flex items-center justify-center"
                    onClick={handleCloseModal}
                  >
                    ✕
                  </button>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="max-w-full max-h-[80vh] rounded-md"
                  />
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleDownload}
                      className="bg-[#5CC8DE] text-black px-4 py-2 rounded-md "
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              </div>
            )}
            <RelatedArtists rankedArtists={rankedArtists} />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayerProfile;

const RelatedArtists = ({ rankedArtists }) => {
  const formatListeners = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M+ Listeners`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K+ Listeners`;
    }
    return `${views} Listeners`;
  };
  return (
    <div className="w-full pb-20 pt-28">
      <h2 className="text-white mb-8 text-4xl font-bold">
        RELATED <span className="text-[#5DC9DE]">ARTISTS:</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {rankedArtists &&
          rankedArtists.map((artist, index) => (
            <Link key={index} to={`/artists/${artist.id}`}>
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-2">
                  <img
                    src={artist.profile_img_url}
                    alt={artist.stage_name}
                    style={{ borderRadius: "50%" }}
                    className="sm:w-[100px] w-[100px] h-[100px] sm:h-[100px] object-cover"
                  />
                </div>
                <p className="text-white text-center text-md font-medium">
                  {artist.stage_name}
                </p>
                <p className="text-gray-400 text-sm">
                  {formatListeners(artist.total_views)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};
