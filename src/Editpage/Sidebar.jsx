import * as React from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const lst = [
  "Home",
  "Education",
  "Work Experience",
  "Projects",
  "Coding handles",
  "Achievements",
  "Skills",
];
const rdrs = ["", "edu", "exp", "prj", "cp", "acv", "skls"];
export default function SideBar() {
  let [active, setActive] = React.useState("");
  const navigate = useNavigate();
  const { name } = useParams();
  const currentPath = useLocation().pathname;
  React.useEffect(() => {
    const pt = currentPath.split("/");
    console.log(pt);

    let v = pt[pt.length - 1];
    setActive(v);
  }, [currentPath]);
  return (
    <div
      style={{ height: "15.5rem", display: "flex", flexDirection: "column" }}
    >
      {lst.map((rdr, i) => {
        return (
          <button
            key={rdr}
            style={{
              width: "12rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              paddingLeft: rdrs[i] == active ? "2.5rem" : "1rem",
              textAlign: "left",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              fontSize: "1.1rem",
              color: rdrs[i] == active ? "white" : "#047857",
              backgroundColor: rdrs[i] == active ? "#047857" : "#e6f4ef",
              marginTop: "0.5rem",
            }}
            onClick={() => {
              setActive(rdrs[i]);
              navigate(`/${name}/edit/${rdrs[i]}`);
            }}
          >
            {rdr}
          </button>
        );
      })}
    </div>
  );
}
