import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LazyLoader from "./components/LazyLoader/LazyLoader";

const Create = lazy(() => import("./components/Create/Create"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const ContactPage = lazy(() => import("./components/ContactPage/ContactPage"));
const Settings = lazy(() => import("./components/Settings/Settings"));
const PrivacyPolicy = lazy(() =>
  import("./components/PrivacyPolicy/PrivacyPolicy")
);
const TermsOfService = lazy(() =>
  import("./components/TermsOfService/TermsOfService")
);
const Home = lazy(() => import("./components/Home/Home"));
const SignonSuccess = lazy(() => import("./components/Signup/SignupSuccess"));
const MyProfile = lazy(() => import("./components/MyProfile/MyProfile"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const Logout = lazy(() => import("./components/Logout/Logout"));
const Guide = lazy(() => import("./components/Guide/Guide"));

export default function AllRoutes() {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signon-success" element={<SignonSuccess />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/profile/:username" element={<UserProfile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/termsofservice" element={<TermsOfService />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
