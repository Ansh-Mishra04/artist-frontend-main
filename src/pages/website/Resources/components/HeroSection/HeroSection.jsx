import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../../../../conf/app";
import searchIc from "/assets/images/artists/searchIc.svg";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    if (value.trim().length == 0) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axiosApi.get(`/content/search?q=${value}`);
      setSearchResults(response.data.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    }
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M+ views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K+ views`;
    }
    return `${views}+ views`;
  };

  return (
    <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center text-white p-8 pt-32 md:pt-0">
      {/* Dark overlay with gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" /> */}

      {/* Background image */}
      <div
        className="absolute inset-0 bg-[url('/assets/images/resources/resourcesHeroBg.png')] bg-cover bg-center"
        style={{
          backgroundBlendMode: "overlay",
        }}
      />

      {/* Content */}
      <div className="relative mt-24 z-20 max-w-3xl w-full text-center space-y-6">
        <h1 className="text-5xl font-bold mt-12">
          FIND WHAT YOU <span className="text-cyan-400">WANT TO LEARN.</span>
        </h1>

        <p className="text-gray-300 text-lg">
          Search for videos, podcasts, and tutorials to enhance your skills and
          knowledge across various topics.
        </p>
        {/* Search bar */}
        <div className="flex justify-center mt-8 relative" ref={dropdownRef}>
          <div className="relative flex w-[300px]  md:w-[600px] bg-gray-100/20 rounded-full backdrop-blur-sm py-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search Podcasts, Songs, Reels..."
              className="flex-1 px-6 py-3 bg-transparent text-white placeholder-gray-300 focus:outline-none"
            />
            <button className="px-4 sm:px-8 py-3 bg-cyan-400 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors ml-2 mr-2">
              <img src={searchIc} alt="Search Icon" />
              <span className="ml-2 text-gray-800 font-medium hidden sm:inline">
                Search
              </span>
            </button>
          </div>

          {/* Search Results Dropdown */}
          {/* Search Results Dropdown */}
          {showDropdown && (
            <>
              {searchResults.length > 0 ? (
                <div className="absolute top-full mt-2 w-[100%] lg:w-[600px] max-h-[400px] overflow-y-auto bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      onClick={() => {
                        navigate(`/content/${result.id}`);
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-gray-800/50 cursor-pointer transition-colors"
                    >
                      <img
                        src={
                          result.thumbnails?.[0] ||
                          "/assets/images/default-thumbnail.png"
                        }
                        alt={result.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-white text-left">
                          {result.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{result.stage_name}</span>
                          <span>{formatViews(result.total_views)}</span>
                        </div>
                      </div>
                      <img
                        src="/assets/images/arrowRightIc.svg"
                        alt="arrowRight"
                        className="w-4 h-4 mx-2"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                searchTerm.trim() !== "" && (
                  <div className="absolute top-full mt-2 w-[100%] lg:w-[600px]">
                    <div className="h-6 mt-4 text-red-500 transition-opacity duration-500">
                      No Data Found.
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
