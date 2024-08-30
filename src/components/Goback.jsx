import { Home } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Goback() {
  const [cookies, setCookie, removeCookie] = useCookies(["userDevtree"]);
  const navigate = useNavigate();
  return (
    <Tooltip title="Go to home">
      <IconButton
        onClick={() => {
          navigate("/");
        }}
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
        <Home style={{ fontSize: "1.5rem" }} />
      </IconButton>
    </Tooltip>
  );
}
