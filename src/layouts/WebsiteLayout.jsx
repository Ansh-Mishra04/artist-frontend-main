import { Outlet } from "react-router-dom";
import WebsiteNavbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSuccessStories, fetchWebsiteConfig } from "../slice/public/website_config";
import { fetchArtists } from "../slice/public/artist";
import { fetchTopPicks } from "../slice/public/top_pick";
import { fetchEvents } from "../slice/public/event";
import { fetchReels } from "../slice/public/content";
import { fetchHistoryLeaderboard } from "../slice/public/leaderboard";

const WebsiteLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchWebsiteConfig());
    dispatch(fetchArtists());
    dispatch(fetchTopPicks());
    dispatch(fetchEvents());
    dispatch(fetchReels());
    dispatch(fetchHistoryLeaderboard());
    dispatch(fetchSuccessStories());
  }, [dispatch]);
  return (
    <div>
      <WebsiteNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
