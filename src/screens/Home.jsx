import { Avatar, CircularProgress } from "@mui/material";
import Container from "../components/Container";

import "../App.css";
import { GitHub, LinkedIn, MailRounded } from "@mui/icons-material";
import IconLink from "../components/IconLink";
import Skl from "../components/Skill";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Empty from "../utils/Empty";
import ErrorC from "../utils/ErrorC";

export default function Home() {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `Home${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/base`).then(
        (res) => res.json()
      ),
  });
  if (isLoading)
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (error || !data || !data.data) return <ErrorC />;
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
        src={data.data.picture}
        alt={data.data.name}
        sx={{ height: "8rem", width: "8rem" }}
        className="shadow-md shadow-gray-800"
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
        {data.data.name}
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
        {data.data.job ? data.data.job : "Forever Student"}
      </div>
      <div>
        {data.data.linkedin && (
          <IconLink
            Component={LinkedIn}
            color="#047857"
            link={data.data.linkedin}
          />
        )}
        {data.data.email && (
          <IconLink
            Component={MailRounded}
            color="#047857"
            link={`mailto:${data.data.email}`}
          />
        )}
        {data.data.github && (
          <IconLink
            Component={GitHub}
            color="#047857"
            link={`https://github.com/${data.data.github}`}
          />
        )}
      </div>

      {data.data.description ? (
        <div style={{ marginTop: "2rem", color: "black" }}>
          {data.data.description}
        </div>
      ) : (
        <Empty msg=" Look's like I need to express myself a little more, Please give me some time" />
      )}
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

      {data.data.skills.length != 0 ? (
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
          {data.data.skills.map((skil) => {
            return <Skl skill={skil} key={skil} />;
          })}
        </div>
      ) : (
        <Empty />
      )}
    </Container>
  );
}
