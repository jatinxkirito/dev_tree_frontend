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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});
var Lf = () => {
  return (
    <div>
      <div>Ghar hai ye hamara</div> <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
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
        children: [
          {
            path: "img/:id",
            Component: Lf,
          },
        ],
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
