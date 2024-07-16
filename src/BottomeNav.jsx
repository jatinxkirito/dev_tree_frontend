import "./App.css";
import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { useNavigate, useParams } from "react-router-dom";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { LaptopRounded, WorkRounded } from "@mui/icons-material";
//import "./index.css";

export default function LabelBottomNavigation() {
  const { name } = useParams();
  const [value, setValue] = React.useState("Home");
  const navigate = useNavigate();

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
      }}
      value={value}
      onChange={handleChange}
      className="shadow-lg shadow-emerald-300"
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        //sx={{ borderRadius: "1.5rem" }}
        icon={<HomeRoundedIcon />}
        onClick={() => {
          navigate(`/${name}`);
        }}
        // sx={{ color: "#047857" }}
      />
      <BottomNavigationAction
        label="Proffesional"
        value="Professional"
        icon={<SchoolRoundedIcon />}
        onClick={() => {
          navigate(`/${name}/education`);
        }}
      />
      <BottomNavigationAction
        label="Work"
        value="Work"
        icon={<WorkRounded />}
        onClick={() => {
          navigate(`/${name}/projects`);
        }}
      />
      <BottomNavigationAction
        label="Coding"
        value="Coding"
        icon={<LaptopRounded />}
        onClick={() => {
          navigate(`/${name}/cp`);
        }}
      />
    </BottomNavigation>
  );
}
