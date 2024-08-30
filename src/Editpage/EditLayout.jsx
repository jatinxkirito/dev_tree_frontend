import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import {
  ArrowBackIosRounded,
  ArrowForwardIosRounded,
  Padding,
} from "@mui/icons-material";
import ResponsiveAppBar from "../AppBar";
import SideBar from "./Sidebar";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { decryptIt } from "../auth/crypt";
import Logout from "../components/Logout";
import Goback from "../components/Goback";
import Know from "../components/Know";
import { IconButton, Tooltip } from "@mui/material";
export default function EditLayout() {
  const [cookies, setCookie] = useCookies(["userDevtree"]);
  const { name } = useParams();
  const [state, setState] = useState("loading");
  const [clp, setclp] = useState(1);
  useEffect(() => {
    if (cookies.userDevtree) {
      const p = decryptIt(cookies.userDevtree);
      if (p != name) setState("na");
      else setState("ok");
      // console.log(p);
    } else {
      setState("na");
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

      <div style={{ display: "flex", flexDirection: "row", width: "95%" }}>
        <div style={{ display: "inline-flex" }}>
          {clp && <SideBar />}
          <button onClick={() => setclp(!clp)}>
            {clp && (
              <Tooltip title="Collapse Navigation">
                <IconButton
                  sx={{
                    p: 0,
                    height: "2rem",
                    width: "2rem",
                    margin: "0.5rem",
                    color: "inherit",
                    backgroundColor: "#ffffff",
                  }}
                  className="shadow-md shadow-gray-800"
                >
                  <ArrowBackIosRounded />
                </IconButton>
              </Tooltip>
            )}
            {!clp && (
              <Tooltip title="open Navigation">
                <IconButton
                  sx={{
                    p: 0,
                    height: "2rem",
                    width: "2rem",
                    margin: "0.5rem",
                    backgroundColor: "#ffffff",
                    color: "inherit",
                  }}
                  className="shadow-md shadow-gray-800"
                >
                  <ArrowForwardIosRounded />
                </IconButton>
              </Tooltip>
            )}
          </button>
        </div>
        <div
          style={{
            overflowY: "scroll",

            height: "85vh",
            width: "100%",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          }}
        >
          <Outlet />
        </div>
        <div
          style={{
            position: "fixed",
            right: "2rem",
            bottom: "4vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Goback />
          <Know />
          <Logout />
        </div>
      </div>
    </body>
  );
}
