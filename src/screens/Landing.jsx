import { SpaRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";
import axios from "axios";
import Button from "@mui/material/Button";
import { googleAuth } from "../auth/googleAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { decryptIt } from "../auth/crypt";
import { useEffect } from "react";
export default function LandingScreen() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userDevtree"]);
  useEffect(() => {
    if (cookies.userDevtree) {
      const p = decryptIt(cookies.userDevtree);
      // console.log(p);
      navigate(`/${p}`);
    }
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        Items: "center",
        padding: "2rem",
      }}
    >
      <SpaRounded sx={{ color: "#10b981", fontSize: "5rem" }} />
      <div style={{ paddingLeft: "2.5rem", width: "fit-content" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontSize: "3rem",
            display: { xs: "none", md: "flex" },
            fontFamily: "Exo 2",
            fontWeight: 800,
            letterSpacing: "0.25rem",
            color: "#10b981",
            textDecoration: "none",
          }}
        >
          DEV-TREE
        </Typography>
      </div>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontSize: "1.05rem",
          display: { xs: "none", md: "flex" },
          fontFamily: "Exo 2",
          fontWeight: 250,
          letterSpacing: "0.2rem",
          color: "#10b981",
          textDecoration: "none",
        }}
      >
        A comprehensive portfolio solution
      </Typography>
      <div
        style={{
          fontSize: "1.3rem",
          display: "flex",
          flexDirection: "column",
          color: "black",
          textWrap: "pretty",
          maxWidth: "40rem",
          marginTop: "2rem",
        }}
      >
        Dev-Tree is an easy and structuted portfolio builder making it really
        easy to show case work and skills. With various integrations including
        platforms like github, codeforces, leetcode, codechef a good first
        expression is right here. Sign up to create your own{" "}
        <p style={{ color: "#10b981", fontWeight: "bold" }}>DEV-TREE</p>.
      </div>
      <Button
        variant="contained"
        sx={{
          borderRadius: "2rem",
          borderWidth: "0.1rem",
          backgroundColor: "#10b981",
          fontWeight: "bold",
          fontSize: "1.1rem",

          "&:hover": {
            backgroundColor: "#049363",
            boxShadow: "#049363 0 0 1rem",
          },
        }}
        onClick={() => {
          window.location = googleAuth();
        }}
      >
        Sign up
      </Button>
    </div>
  );
}
