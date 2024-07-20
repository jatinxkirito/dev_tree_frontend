import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "./Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Exp({ data, tr }) {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot variant="outlined" sx={{ borderColor: "#052e16" }} />
        {!tr && <TimelineConnector sx={{ backgroundColor: "#052e16" }} />}
      </TimelineSeparator>
      <TimelineContent>
        <div
          style={{
            width: "100%",
            // borderRadius: "2rem",
            // borderWidth: "0.15rem",
            // borderColor: "#052e16",
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              paddingInline: "1rem",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "1.2rem",
                color: "#047857",
                fontWeight: "bold",
              }}
            >
              {data.company}
            </p>
            <p style={{ fontSize: "0.8rem", marginTop: "auto" }}>
              {data.location}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              paddingInline: "1rem",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{data.jobTitle}</div>
            <div style={{ fontSize: "0.8rem", marginTop: "auto" }}>
              {data.startDate} - {data.endDate}
            </div>
          </div>
          <div
            style={{
              marginLeft: "1rem",
              marginRight: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            Techstack:{"  "}
            <p style={{ color: "#052e16", fontWeight: "bold" }}>
              {data.skills}
            </p>
          </div>
          <div
            style={{
              marginLeft: "1rem",
              marginRight: "auto",
              display: "flex",
              textWrap: "pretty",
            }}
          >
            {data.description}
            {/* Techstack:{"  "}
            <p style={{ color: "#052e16", fontWeight: "bold" }}>{data.Score}</p> */}
          </div>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
}
export default function Work() {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `experience${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/experience`).then(
        (res) => res.json()
      ),
  });
  //console.log(data);
  if (isLoading) return <div>Loading...</div>;
  var lst = data.data.work;
  return (
    <Container>
      <div
        style={{
          color: "#052e16",
          fontSize: "3rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          //marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Work Experience
      </div>
      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          width: "80%",
          maxWidth: "60rem",
        }}
      >
        {lst.map((data, i) => {
          return <Exp data={data} key={i} tr={i == lst.length - 1} />;
        })}
      </Timeline>
    </Container>
  );
}
