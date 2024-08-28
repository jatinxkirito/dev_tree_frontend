import { Avatar } from "@mui/material";
import Container from "./Container";
import { LinkedIn, MailRounded } from "@mui/icons-material";
import IconLink from "./IconLink";
import dp from "../assets/dp.jpg";
import qr from "../assets/greed.jpg";
import ResponsiveAppBar from "../AppBar";
export default function Me() {
  return (
    <>
      <ResponsiveAppBar />

      <Container>
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            fontFamily: "Pacifico",
            marginBottom: "0.5rem",
            letterSpacing: "0.03rem",
            color: "#047857",
          }}
        >
          Hey, I am
        </div>
        <Avatar
          src={dp}
          alt="Jatin Madaan"
          sx={{ height: "8rem", width: "8rem" }}
          className="shadow-lg shadow-gray-800"
        />
        <div
          style={{
            fontSize: "1.4rem",
            fontWeight: "bold",
            fontFamily: "Pacifico",
            color: "#047857",
            marginTop: "1rem",
            textWrap: "pretty",
            maxWidth: "30rem",
          }}
        >
          Jatin Madaan
        </div>
        <div
          style={{
            marginTop: "0.02rem",
            fontSize: "1.1rem",
            fontFamily: "Alegreya",
            letterSpacing: "0.03rem",
            maxWidth: "30rem",
            color: "black",
            fontWeight: "bold",
          }}
        >
          {"Creator of this website"}
        </div>

        <div style={{ marginTop: "2rem", color: "black" }}>
          I am a final year student at Indian Institute Of Information
          Technology Sonepat. If you have any query or suggestion, please reach
          me out here. Looking forward to hear from you 😁
        </div>
        <div>
          <IconLink
            Component={LinkedIn}
            color="#047857"
            link={"https://www.linkedin.com/in/jatin-madaan-949423221/"}
          />

          <IconLink
            Component={MailRounded}
            color="#047857"
            link="mailto:sjmadaan143@gmail.com"
          />
        </div>
        <div style={{ marginTop: "2rem", color: "black" }}>
          And if you like the product, you can buy me a coffee as thanks 😉
        </div>
        <img src={qr} style={{ height: "60vh" }} />
      </Container>
    </>
  );
}
