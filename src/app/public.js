import { configureStore } from "@reduxjs/toolkit";
import websiteConfigReducer from "../slice/public/website_config";
import artistReducer from "../slice/public/artist"
import topPickReducer from "../slice/public/top_pick"
import eventReducer from "../slice/public/event"
import contentReducer from "../slice/public/content"
import leaderboardReducer from "../slice/public/leaderboard"
import contentInteractionReducer from "../slice/public/contentInteractionSlice"
export const publicStore = configureStore({
    reducer: {
        websiteConfig: websiteConfigReducer,
        artist : artistReducer,
        topPick : topPickReducer,
        event : eventReducer,
        content : contentReducer,
        leaderboard : leaderboardReducer,
        contentInteraction: contentInteractionReducer,

    }
});