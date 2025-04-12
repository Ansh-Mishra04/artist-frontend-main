import { Route, Routes } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Home from "../pages/website/Home/Home";
import Contact from "../pages/website/Contact/Contact";
import Events from "../pages/website/Events/Events";
import Artists from "../pages/website/Artists/Artists";
import Leaderboard from "../pages/website/Leaderboard/Leaderboard";
import Resources from "../pages/website/Resources/Resources";
import IndividualPodcast from "../pages/website/Resources/components/IndividualPodcast/IndividualPodcast";
import IndividualEvent from "../pages/website/Events/components/IndividualEvent/IndividualEvent";
import MusicPlayerProfile from "../pages/website/Artists/components/MusicPlayerProfile";
import PaymentScreen from "../pages/website/Events/components/PaymentScreen";

// import SignIn from "../pages/auth/SignIn/SignIn";
// import SignUp from "../pages/auth/SignUp/SignUp";
// import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
// import PaymentScreen from "../pages/auth/SignUp/Payment/Payment";
// import PersonalDetailsForm from "../pages/auth/SignUp/CreateProfile/PersonalDetailsForm";
// import ProfessionalDetailsForm from "../pages/auth/SignUp/CreateProfile/ProfessionalDetailsForm";
// import DocumentationDetailsForm from "../pages/auth/SignUp/CreateProfile/DocumentationDetailsForm";
// import ProfileStatus from "../pages/auth/SignUp/ProfileStatus/ProfileStatus";
import { Provider } from "react-redux";
import { publicStore } from "../app/public";
import Error from "../pages/website/Error";
import SuccessScreen from "../pages/website/Events/components/SuccessScreen";

const WebsiteRoutes = () => {
  return (
    <Provider store={publicStore}>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<IndividualEvent />} />
          <Route path="payment" element={<PaymentScreen />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artists/:id" element={<MusicPlayerProfile />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="resources" element={<Resources />} />
          <Route path="content/:id" element={<IndividualPodcast />} />
          <Route path="success" element={<SuccessScreen />} />
          <Route path="*" element={<Error />} />

          {/* Route for signin, signup and payment, change later */}
          {/* <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="payment" element={<PaymentScreen />} /> */}
          {/* <Route
          path="create-profile/personal-details"
          element={<PersonalDetailsForm />}
        />
        <Route
          path="create-profile/professional-details/"
          element={<ProfessionalDetailsForm />}
        />
        <Route
          path="create-profile/documentation-details/"
          element={<DocumentationDetailsForm />}
        />
        <Route path="profile-status" element={<ProfileStatus />} /> */}
        </Route>
      </Routes>
    </Provider>
  );
};

export default WebsiteRoutes;
