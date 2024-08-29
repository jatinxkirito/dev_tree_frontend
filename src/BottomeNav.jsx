import "./App.css";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { LaptopRounded, WorkRounded } from "@mui/icons-material";

export default function LabelBottomNavigation() {
  const { name } = useParams();
  const [value, setValue] = React.useState("Home");
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  React.useEffect(() => {
    const pt = currentPath.split("/");
    let v = "Home";
    if (pt.length == 3) v = pt[pt.length - 1];
    setValue(v);
  }, [currentPath]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        width: "fit-content",
        borderRadius: "1.5rem",
        marginBottom: "1rem",
        backgroundColor: "#ecfdf5",
        borderColor: "black",
        borderWidth: "0.05rem",
        zIndex: "2",
        position: "sticky",
        bottom: "1rem",
        height: "fit-content",
        color: "#047857",
      }}
      value={value}
      onChange={handleChange}
      className="shadow-lg shadow-emerald-300"
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeRoundedIcon />}
        onClick={() => {
          navigate(`/${name}`);
        }}
      />
      <BottomNavigationAction
        label="Proffesional"
        value="education"
        icon={<SchoolRoundedIcon sx={{ color: "#047857" }} />}
        onClick={() => {
          navigate(`/${name}/education`);
        }}
      />
      <BottomNavigationAction
        label="Work"
        value="projects"
        icon={<WorkRounded />}
        onClick={() => {
          navigate(`/${name}/projects`);
        }}
      />
      <BottomNavigationAction
        label="Coding"
        value="cp"
        icon={<LaptopRounded />}
        onClick={() => {
          navigate(`/${name}/cp`);
        }}
      />
    </BottomNavigation>
  );
}
