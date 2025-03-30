import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import TopPicksSection from "../Home/components/TopPicksSection/TopPicksSection";
import ArtistSlider from "../Home/components/ArtistSlider/ArtistSlider";
import axiosApi from "../../../conf/app";
import MusicPlayerProfile2 from "./components/MusicPlayerProfile2";

function Artists() {
  const [artists,setArtists] = useState([])
   const [error,setError] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
  const fetchAllArtists = async ()=>{
    setIsLoading(true);
    try{
      const response = await axiosApi.get('/artists/search');
      setArtists(response.data.data)
    }
    catch(err){
     setError("Failed to fetch Artists");
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(()=>{
    fetchAllArtists();
  },[])
  return (
   <>
    {isLoading && (
          <div className="text-center h-[90vh] w-full  py-32">
            <div className="animate-spin rounded-full w-12 h-12  border-b-2 border-[#5DC9DE] mx-auto"></div>
            <p className="mt-2 text-[#5DC9DE]">🎶 "Tuning the strings... your music is on its way!" 🎵</p>
          </div>
        )}
      {
          error && (
            <div className="text-center flex flex-col justify-center items-center h-[80vh] w-full ">
            <h1 className="text-3xl text-red-500">{error}</h1>
            <Link to={'/'}>
            <button   className="px-5 py-2 bg-[#5DC9DE] text-black mt-4 rounded-full">Go Back</button>

            </Link>
          </div>
          )
        }
        {
           !isLoading && !error &&
           <div>
           <HeroSection artists={artists} />
           <div className=" lg:px-10 px-6 xl:px-16">
      <div className="container w-full  h-[1px] mx-auto bg-gray-400 opacity-30 relative"></div>

       </div>
           {/* <TopPicksSection /> */}
            <MusicPlayerProfile2></MusicPlayerProfile2>
            <div className=" lg:px-10 px-6 xl:px-16">
      <div className="container w-full  h-[1px] mx-auto bg-gray-400 opacity-30 relative"></div>

       </div>
           <ArtistSlider  />
         </div>
        }
   </>
  );
}

export default Artists;
