import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import "./AppBar.css";
import { SpaRounded } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { decryptIt } from "./auth/crypt";
import axios from "axios";
import { googleAuth } from "./auth/googleAuth";
import { useNavigate } from "react-router-dom";

export default function ResponsiveAppBar() {
  const [cookies, setCookie] = useCookies(["userDevtree"]);
  const navigate = useNavigate();
  const [ico, setIco] = React.useState("Loading");

  React.useEffect(() => {
    let ignore = false;
    if (cookies.userDevtree && !ignore) {
      const x = decryptIt(cookies.userDevtree);

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/${x}/image`)
        .then((res) => {
          setIco(res.data.data.picture);
        })
        .catch((err) => {
          setIco("Error");
        });
    }
    return () => {
      ignore = true;
    };
  }, [cookies]);

  return (
    <AppBar disableGutters position="static" className="appbar">
      <Container disableGutters maxWidth={false}>
        <Toolbar className="appbar">
          <SpaRounded
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              fontSize: "2rem",
            }}
          />
          <button
            onClick={() => {
              navigate("/meetthemaker");
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                fontSize: "1.5rem",
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                letterSpacing: ".4rem",
                color: "inherit",
                textDecoration: "none",
                marginLeft: "1rem",
              }}
            >
              DEV-TREE
            </Typography>
          </button>

          <SpaRounded sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DEV-TREE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          {!cookies.userDevtree && (
            <Button
              variant="contained"
              sx={{
                borderRadius: "1rem",
                borderWidth: "0.1rem",
                backgroundColor: "#10b981",

                fontSize: "1rem",

                "&:hover": {
                  backgroundColor: "#049363",
                  boxShadow: "#049363 0 0 1rem",
                },
              }}
              onClick={() => {
                window.location = googleAuth();
              }}
            >
              Create your own
            </Button>
          )}
          {cookies.userDevtree && (
            <Tooltip title="Open settings">
              <IconButton
                onClick={() => {
                  navigate(`/${decryptIt(cookies.userDevtree)}/edit/`);
                }}
                sx={{ p: 0, height: "1.5rem" }}
              >
                <Avatar alt={decryptIt(cookies.userDevtree)} src={ico} />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
