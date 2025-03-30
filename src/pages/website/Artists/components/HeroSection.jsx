import React, { useEffect, useState, useRef } from "react";
import searchIc from "/assets/images/artists/searchIc.svg";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../../../conf/app";

const HeroSection = () => {
  const [inputName, setInputName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await axiosApi.get(`/artists/search?q=${query}`);
      setSearchResults(response.data.data);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectArtist = (artist) => {
    navigate(`/artists/${artist.id}`);
    setIsDropdownOpen(false);
  };

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputName) {
        handleSearch(inputName);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputName]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative sm:min-h-[70vh] min-h-[40vh] w-full flex flex-col items-center justify-center text-white pt-8 sm:pt-12">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/artists/artistHeroBg.png')] bg-cover bg-center"
        style={{ backgroundBlendMode: "overlay" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold">
        FIND YOUR  <span className="text-[#5DC9DE]">COLLABORATOR</span>
        </h1>

        <p className="text-gray-300 px-4 sm:text-base lg:text-lg">
        No need to look anywhere else—every music artist you seek is right here.
        </p>

        {/* Search bar */}
        <div className="flex justify-center mt-8 relative" ref={searchContainerRef}>
          <div className="relative flex w-[90%] sm:w-[600px] bg-gray-100/20 rounded-full backdrop-blur-sm py-2">
            <input
              type="text"
              placeholder="Search Artists..."
              value={inputName}
              className="flex-1 px-6 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
              onChange={(e) => setInputName(e.target.value)}
              onFocus={() => setIsDropdownOpen(true)}
            />
            <button
              className="px-8 py-3 bg-[#5DC9DE] hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors ml-2 mr-2"
              onClick={() => handleSearch(inputName)}
            >
              <img src={searchIc} alt="Search Icon" />
              <span className="ml-2 text-gray-800 font-medium hidden sm:block">Search</span>
            </button>
          </div>

          {/* Search results dropdown */}
          {isDropdownOpen && inputName && (
            <ul className="absolute w-[90%] sm:w-[600px] pb-10 bg-gray-800/95 text-white rounded-md shadow-lg backdrop-blur-sm z-[200000]
       max-h-64 overflow-y-auto border bottom-0 translate-y-full border-gray-700">
              {loading ? (
                <li className="px-4 py-3">Loading...</li>
              ) : searchResults.length > 0 ? (
                searchResults.map((artist) => (
                  <li
                    key={artist.id}
                    className="px-4 py-4 hover:bg-gray-700/50 cursor-pointer transition-colors border-b border-gray-700 last:border-b-0"
                    onClick={() => handleSelectArtist(artist)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelectArtist(artist)}
                    tabIndex={0}
                    role="button"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="min-w-0 flex-1 flex items-center gap-4">
                        <p className="font-medium truncate">{artist.stage_name}</p>
                        <p className="text-sm text-gray-300 truncate">{artist.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm">{artist.total_songs} Songs</p>
                        <p className="text-sm text-gray-300">{artist.total_views} Views</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-4 py-3">No artists found</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
