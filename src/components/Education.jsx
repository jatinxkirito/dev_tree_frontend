import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Container from "./Container";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// const lst = [
//   {
//     Name: "Indian Institute of Information Technology Sonepat",
//     Degree: "Btech-Computer Science and Technology",
//     Location: "Sonepat, India",
//     Score: "9",
//     StartYear: "2021",
//     EndYear: "2025",
//   },
//   {
//     Name: "O.S.D.A.V Public School",
//     Degree: "CBSE Class XII",
//     Location: "Kaithal, India",
//     Score: "97.6%",
//     StartYear: "2020",
//     EndYear: "2021",
//   },
//   {
//     Name: "O.S.D.A.V Public School",
//     Degree: "CBSE Class X",
//     Location: "Kaithal, India",
//     Score: "92%",
//     StartYear: "2018",
//     EndYear: "2019",
//   },
// ];
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
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Loading...</div>;
  //console.log(data);
  var lst = data.data.education;

  // console.log(lst);
  return (
    <Container>
      <div
        style={{
          color: "#052e16",
          fontSize: "3rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        Education
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
          return <Degree data={data} key={i} tr={i == lst.length - 1} />;
        })}
      </Timeline>
    </Container>
  );
}
