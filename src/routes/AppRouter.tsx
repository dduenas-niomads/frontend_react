// src/AppRouter.tsx
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import SignIn from "../pages/AuthPages/SignIn";
import SignUp from "../pages/AuthPages/SignUp";
import NotFound from "../pages/OtherPage/NotFound";
import UserProfiles from "../pages/UserProfiles";
import Videos from "../pages/UiElements/Videos";
import Images from "../pages/UiElements/Images";
import Alerts from "../pages/UiElements/Alerts";
import Badges from "../pages/UiElements/Badges";
import Avatars from "../pages/UiElements/Avatars";
import Buttons from "../pages/UiElements/Buttons";
import LineChart from "../pages/Charts/LineChart";
import BarChart from "../pages/Charts/BarChart";
import Calendar from "../pages/Calendar";
import BasicTables from "../pages/Tables/BasicTables";
import FormElements from "../pages/Forms/FormElements";
import Blank from "../pages/Blank";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import { ScrollToTop } from "../components/common/ScrollToTop";

export default function AppRouter() {
  const { loading, authenticated } = useAuth();
  const location = useLocation();

  const protectedPaths = [
    "/",
    "/home",
    "/profile",
    "/calendar",
    "/blank",
    "/form-elements",
    "/basic-tables",
    "/alerts",
    "/avatars",
    "/badge",
    "/buttons",
    "/images",
    "/videos",
    "/line-chart",
    "/bar-chart",
  ];

  const isProtectedRoute = protectedPaths.includes(location.pathname);

  if (loading) return <p>Cargando sesión...</p>;

  if (authenticated && ["/signin", "/signup"].includes(location.pathname)) {
    return <Navigate to="/home" replace />;
  }

  if (!authenticated && isProtectedRoute) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}