import Layou from "./Layout";
import "./App.css";
// import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import LandingScreen from "./screens/Landing";
import Home from "./screens/Home";

import Cp from "./screens/Cp";
import Professional from "./screens/Professional";

import Work from "./screens/Work";
import { GoogleCallback } from "./auth/googleAuth";

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
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <h1 className="text-3xl font-bold underline">Hello world!</h1>,
//   },
// ]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
