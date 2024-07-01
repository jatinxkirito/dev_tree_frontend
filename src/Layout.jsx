import ResponsiveAppBar from "./AppBar";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import LabelBottomNavigation from "./BottomeNav";
import { Padding } from "@mui/icons-material";
export default function Layou() {
  const currentPath = useLocation().pathname;
  var f = currentPath != "/";
  console.log(currentPath);
  return (
    <body
      className="flex items-center flex-col justify-between"
      style={{ padding: 0 }}
    >
      <ResponsiveAppBar />
      <Outlet />
      {f && <LabelBottomNavigation />}
    </body>
  );
}
