import { LogoutRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [cookies, setCookie, removeCookie] = useCookies(["userDevtree"]);
  const navigate = useNavigate();
  return (
    <Tooltip title="Logout">
      <IconButton
        onClick={() => {
          removeCookie("userDevtree");
          navigate("/");
        }}
        sx={{
          p: 0,
          height: "2rem",
          width: "2rem",
          margin: "0.5rem",
          color: "inherit",
        }}
        className="shadow-md shadow-gray-800"
      >
        <LogoutRounded style={{ fontSize: "1.5rem" }} />
      </IconButton>
    </Tooltip>
  );
}
