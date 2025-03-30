import React from "react";
import provideImg1 from "/assets/images/provide1.png";
import provideImg2 from "/assets/images/provide2.png";
import provideImg3 from "/assets/images/provide3.png";
import provideImg4 from "/assets/images/provide4.png";
import whatWePro from "../../../../../../public/assets/images/what-we-provide.png";
import Struggle from "../../../../../../public/assets/images/struggle2.png";

const WhatWeProvide = () => {
  const features = [
    "A Safe Space",
    "A Growth Partner",
    "All in One Support",
    "Connect to Audience",
    "Centralized Platform",
    "Networking Platform",
    "Collaboration Platform",
    "Ownership Friendly",
    "Revenue First Model",
  ];


  return (
    <div className="bg-black relative text-white h-full pt-10 ps-8">
      <img src={Struggle} className="absolute sm:w-[100vh] -rotate-12 sm:right-[-57px]" alt="" />
      <div className="container mx-auto pb-10 grid grid-cols-1 lg:pb-20 xl:pb-0 lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-6 mt-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
          THE VALUE <span className="text-[#5DC9DE]">WE PROVIDE</span>
          </h2>

          <p className="text-gray-400">
          OPH Community is a unified platform that relieves artists of the burden of juggling multiple services. We empowers artists by providing them with essential tools, exposure, 
          and opportunities, ensuring their growth and success without unnecessary obstacles.
          </p>

          {/* <p className="text-gray-400">
          OPH Community is a unified platform that relieves artists of the burden of juggling multiple services. We empowers artists by providing them with essential tools, 
          exposure, and opportunities, ensuring their growth and success without unnecessary obstacles.
          </p> */}

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#5DC9DE] rounded-full"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image Grid */}
        <img className="object-cover z-30 hidden lg:block w-full xl:h-[900px] md:h-[500px] lg:h-[650px] xl:mt-[-150px] mt-0 " src={whatWePro} alt="" />
      </div>
    </div>
  );
};

export default WhatWeProvide;
