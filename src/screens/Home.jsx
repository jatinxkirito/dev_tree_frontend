import { Avatar, Box } from "@mui/material";
import Container from "../components/Container";

import dp from "../assets/krto.png";

import "../App.css";
import {
  GitHub,
  LinkedIn,
  Mail,
  MailLockRounded,
  MailRounded,
} from "@mui/icons-material";
import IconLink from "../components/IconLink";
import Skl from "../components/Skill";
import Graph from "../components/graph";
import LcGraph from "../components/LcGraph";
const Skls = [
  "C++",
  "Javascript",
  "Python",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Computer Vision",
  "Competitive Programming",
  "Web Development",
  "Node.Js",
  "React.Js",
  "OpenCV",
  "Git",
  "Pandas",
];
export default function Home() {
  return (
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
        Kirito
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
        Software Engineer
      </div>
      <div>
        <IconLink
          Component={LinkedIn}
          color="#047857"
          link="https://www.linkedin.com/in/jatin-madaan-949423221/"
        />
        <IconLink
          Component={MailRounded}
          color="#047857"
          link="mailto:sjmadaan143@gmail.com"
        />
        <IconLink
          Component={GitHub}
          color="#047857"
          link="https://github.com/jatinxkirito"
        />
      </div>
      <div style={{ marginTop: "2rem", color: "black" }}>
        I am a third year student at{" "}
        {<b>Indian Institute of Information Technology, Sonepat</b>}. I am a
        dedicated and inquisitive individual with a passion for exploration. My
        expertise lies in Competitive Programming, and I possess strong skills
        in various areas, including Data Science, Machine Learning, Data
        Structures and Algorithms, Computer Vision, and Web Development. I am
        driven by a keen interest in the fields of data science and machine
        learning, constantly seeking opportunities to enhance my knowledge and
        contribute to innovative projects.
      </div>
      <div
        style={{
          color: "black",
          fontSize: "2rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          marginTop: "1.5rem",
        }}
      >
        Skills
      </div>
      <div
        style={{
          display: "flex",
          height: "fit-content",
          width: "fit-content",
          maxWidth: "40rem",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {Skls.map((skil) => {
          return <Skl skill={skil} key={skil} />;
        })}
      </div>

      {/* <Graph /> */}
    </Container>
  );
}
