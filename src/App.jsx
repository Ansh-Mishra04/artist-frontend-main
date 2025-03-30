import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebsiteRoutes from "./routes/WebsiteRoutes";
import { Provider } from "react-redux";
import { publicStore } from "./app/public";
// import NotFound from "./pages/error/NotFound";
// import Unauthorized from "./pages/error/Unauthorized";

const App = () => {
  return (

       <Router>
      <Routes>
        {/* Website Routes */}
        <Route path="/*" element={<WebsiteRoutes />} />
        {/* Error Pages */}
        {/* <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> */}
      </Routes>
    </Router>
   
  );
};

export default App;
