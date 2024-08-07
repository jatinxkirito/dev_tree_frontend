import Layou from "./Layout";
import "./App.css";
// import "./index.css";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import LandingScreen from "./screens/Landing";
import Home from "./screens/Home";

import Cp from "./screens/Cp";
import Professional from "./screens/Professional";

import Work from "./screens/Work";
import { GoogleCallback } from "./auth/googleAuth";
import EditLayout from "./Editpage/EditLayout";
import EducationForm from "./Editpage/components/Education";
import ExperienceForm from "./Editpage/components/Experience";
import CodingForm from "./Editpage/components/Coding";
import AchievementForm from "./Editpage/components/Achievments";
import HomeForm from "./Editpage/components/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/auth/google/callback",
    Component: GoogleCallback,
  },
  {
    path: "/:name/edit",
    Component: EditLayout,
    children: [
      {
        path: "/:name/edit/",
        Component: HomeForm,
      },
      {
        path: "/:name/edit/edu",
        Component: EducationForm,
      },
      {
        path: "/:name/edit/exp",
        Component: ExperienceForm,
      },
      {
        path: "/:name/edit/cp",
        Component: CodingForm,
      },
      {
        path: "/:name/edit/acv",
        Component: AchievementForm,
      },
    ],
  },
  {
    path: "/",
    Component: Layou,
    children: [
      {
        path: "/",
        Component: LandingScreen,
      },
      {
        path: "/:name/cp",
        Component: Cp,
      },
      {
        path: "/:name/education",
        Component: Professional,
      },
      {
        path: "/:name/projects",
        Component: Work,
      },
      {
        path: "/:name",
        Component: Home,
      },
    ],
  },
]);

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
