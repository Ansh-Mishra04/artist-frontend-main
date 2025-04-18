import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection/HeroSection";
import PreviousEventSection from "./components/PreviousEventSection/PreviousEventSection";
import axiosApi from "../../../conf/app";
import { ToastContainer } from "react-toastify";

function Events() {
  const [professions, setProfessions] = useState([]);
  const fetchProfessions = async () => {
    try {
      const response = await axiosApi.get("/professions");
      setProfessions(response.data.data);
      console.log(professions);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfessions();
  }, []);
  return (
    <div className="relative ">
      <HeroSection professions={professions} />
      <div className="lg:px-10 px-6 xl:px-16">
        <div className="container w-full  h-[1px] mx-auto bg-gray-400 opacity-30 relative"></div>
      </div>
      {/* <div className="container w-full h-[.5px] mx-auto bg-white opacity-30 relative"></div> */}
      <PreviousEventSection />
      <ToastContainer className="z-[100000]" />
    </div>
  );
}

export default Events;
