import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { useState, useEffect } from "react";

function Footer() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);
  return (
    <div
      className="w-full h-auto lg:px-16 px-2 flex flex-col bg-[url('/assets/images/contact/footer.png')] bg-contain  bg-right-top relative
              before:content-['']
              before:absolute
              before:inset-0
              before:block
              before:bg-gradient-to-r
              before:from-[#0C0C11]
              before:to-[#252730]
              before:opacity-75
              before:z-5"
    >
      <div className="flex h-full flex-col justify-between w-full z-10 container mx-auto gap-6 sm:gap-0 sm:mt-12 mt-4">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="xl:text-[55px] text-[30px] md:text-[40px] text-center lg:text-left w-full lg:w-1/2 uppercase font-bold leading-[3rem] sm:leading-[4rem]">
            Your Music
            <br />
            Your Rights
            <br />
            <span className="text-[#5DC9DE]">Your Stage</span>
          </div>
                                   <div className="w-full flex justify-center lg:justify-end pt-3 sm:pt-12">
            {
             (
                <>

                    <button onClick={() =>{window.location.href=import.meta.env.VITE_PORTAL_URL+'/auth/signup'}} className="bg-primary h-14 lg:w-auto  text-black font-semibold py-3 px-6 sm:px-8 rounded-full hover:font-bold transition delay-300">
                    LIMITED TIME OPPORTUNITY - Sign Up
                    </button>

                </>
              )
            }


          </div>
        </div>

        <div className="w-full flex justify-between">
          <div className="text-md lg:text-left text-center text-[#9BA3B7] w-full lg:w-1/3 px-8 lg:px-0 py-3">
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took.
          </div>
          <ul className="hidden lg:flex space-x-12 justify-end text-white w-1/2">
            <li>
              <Link to="/" className="font-semibold  hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="font-semibold  hover:text-gray-300">
                Events
              </Link>
            </li>
            <li>
              <a href="/artists" className="font-semibold  hover:text-gray-300">
                Artists
              </a>
            </li>
            <li>
              <a
                href="/leaderboard"
                className="font-semibold  hover:text-gray-300"
              >
                Leaderboard
              </a>
            </li>
            <li>
              <a
                href="/resources"
                className="font-semibold  hover:text-gray-300"
              >
                Resources
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-semibold  hover:text-gray-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="container w-full h-[1px] opacity-30 mx-auto bg-white relative sm:my-8 my-2"></div>

                <div className="w-full flex flex-col lg:flex-row justify-between sm:my-8">
          <ul className="flex space-x-8 sm:justify-start text-white sm:w-1/2 mb-5 lg:mb-0 mx-auto sm:mx-0">
            <li>
              <Link className="font-normal hover:text-gray-300">Privacy Policy</Link>
            </li>
            <li>
              <Link className="font-normal hover:text-gray-300">Terms and Conditions</Link>
            </li>
            <li>
              <a className="font-normal hover:text-gray-300">Refund</a>
            </li>
            <li>
              <a className="font-normal hover:text-gray-300">Cancellation Policy</a>
            </li>
            <li>
              <a className="font-normal hover:text-gray-300">Disclaimer</a>
            </li>
          </ul>
        
          <div className="flex gap-4 w-full lg:w-1/2 justify-center lg:justify-end">
            <a
              href="/facebook"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <FaFacebook size={32} />
            </a>
            <a
              href="/instagram"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <AiFillInstagram size={32}></AiFillInstagram>
            </a>
            <a
              href="/linkedin"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <FaLinkedin size={32} />
            </a>
            <a
              href="/twitter"
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <BsTwitterX size={32} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
