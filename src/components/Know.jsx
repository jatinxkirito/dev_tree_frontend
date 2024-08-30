import { HelpOutlineRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Know() {
  const [cookies, setCookie, removeCookie] = useCookies(["userDevtree"]);
  const navigate = useNavigate();
  return (
    <Tooltip title="Know the developer or have any queries?">
      <IconButton
        onClick={() => {
          navigate("/meetthemaker");
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
        <HelpOutlineRounded style={{ fontSize: "1.5rem" }} />
      </IconButton>
    </Tooltip>
  );
}
