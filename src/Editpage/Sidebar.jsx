import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
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
  let [active, setActive] = React.useState("Home");
  const navigate = useNavigate();
  const { name } = useParams();
  return (
    <div
      style={{ height: "15.5rem", display: "flex", flexDirection: "column" }}
    >
      {lst.map((rdr, i) => {
        return (
          <div
            key={rdr}
            style={{
              width: "12rem",
              paddingTop: "0.5rem",
              paddingBottom: "0.5rem",
              paddingLeft: rdr == active ? "2.5rem" : "1rem",
              textAlign: "left",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              fontSize: "1.1rem",
              color: rdr == active ? "white" : "#047857",
              backgroundColor: rdr == active ? "#047857" : "#e6f4ef",
              marginTop: "0.5rem",
            }}
            onClick={() => {
              setActive(rdr);
              navigate(`/${name}/edit/${rdrs[i]}`);
            }}
          >
            {rdr}
          </div>
        );
      })}
    </div>
  );
}
