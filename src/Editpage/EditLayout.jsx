import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { Padding } from "@mui/icons-material";
import ResponsiveAppBar from "../AppBar";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { decryptIt } from "../auth/crypt";
export default function EditLayout() {
  const [cookies, setCookie] = useCookies(["userDevtree"]);
  const { name } = useParams();
  const [state, setState] = useState("loading");
  useEffect(() => {
    if (cookies.userDevtree) {
      const p = decryptIt(cookies.userDevtree);
      if (p != name) setState("na");
      else setState("ok");
      // console.log(p);
    }
  });
  const currentPath = useLocation().pathname;
  if (state == "loading") return <div>Loading...</div>;
  if (state == "na") return <div>You are not authorized for this</div>;

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
            height: "100%rem",
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
