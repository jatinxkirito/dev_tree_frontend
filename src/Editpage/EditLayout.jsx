import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Padding } from "@mui/icons-material";
import ResponsiveAppBar from "../AppBar";
import SideBar from "./Sidebar";
export default function EditLayout() {
  const currentPath = useLocation().pathname;

  var f = currentPath != "/";
  console.log(currentPath);
  return (
    <body className="flex items-center flex-col" style={{ padding: 0 }}>
      <ResponsiveAppBar />
      <div style={{ display: "flex", flexDirection: "row", width: "80%" }}>
        <SideBar />
        <div
          style={{
            overflowY: "scroll",
            height: "20rem",
            width: "100%",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          <Outlet />
        </div>
      </div>
    </body>
  );
}
