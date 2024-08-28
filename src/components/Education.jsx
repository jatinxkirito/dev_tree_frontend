import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "./Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
import Empty from "../utils/Empty";

function Degree({ data, tr }) {
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
              {data.institutionName}
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
            <div>{data.degreeName}</div>
            <div style={{ fontSize: "0.8rem", marginTop: "auto" }}>
              {data.startDate}-{data.endDate}
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
            Grade:{"  "}
            <p style={{ color: "#052e16", fontWeight: "bold" }}>{data.grade}</p>
          </div>
        </div>
      </TimelineContent>
    </TimelineItem>
  );
}
export default function Education() {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `Education${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/education`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) return <CircularProgress color="inherit" />;
  if (!data || !data.data || !data.data.education || error) return <ErrorC />;

  var lst = data.data.education;

  return (
    <Container>
      {lst.length == 0 && <Empty />}
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
          return <Degree data={data} key={i} tr={i == lst.length - 1} />;
        })}
      </Timeline>
    </Container>
  );
}
