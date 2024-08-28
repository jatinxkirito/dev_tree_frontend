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
import SkillsForm from "./Editpage/components/Skills.jsx";
import ProjectForm from "./Editpage/components/Projects.jsx";
import { ErrorBoundary } from "react-error-boundary";
import Protection from "./utils/NotFound.jsx";
import Me from "./components/Me.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/meetthemaker",
    Component: Me,
  },
  {
    path: "/auth/google/callback",
    errorElement: <Protection />,
    Component: GoogleCallback,
  },
  {
    path: "/:name/edit",
    errorElement: <Protection />,
    Component: EditLayout,
    children: [
      {
        path: "/:name/edit/",
        Component: HomeForm,
      },
      {
        path: "/:name/edit/prj",
        Component: ProjectForm,
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
      {
        path: "/:name/edit/skls",
        Component: SkillsForm,
      },
    ],
  },
  {
    path: "/",
    Component: Layou,
    errorElement: <Protection />,
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
