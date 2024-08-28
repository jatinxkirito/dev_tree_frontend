import { useQuery } from "@tanstack/react-query";

import cmc from "../assets/Codeforces.webp";

import Container from "./Container";
import Graph from "./graph";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
export default function Cf({ CfId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Cf${CfId}Data`,
    queryFn: () =>
      fetch(`https://codeforces.com/api/user.rating?handle=${CfId}`).then(
        (res) => res.json()
      ),
  });

  if (isLoading)
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (!data || error)
    return (
      <div>
        <ErrorC msg="Couldn't load codeforces" />
      </div>
    );
  if (data.status == "FAILED")
    return (
      <div>
        <ErrorC />
      </div>
    );

  var contestRating = data.result.map((ct) => {
    return ct.newRating;
  });
  //console.log(contestRating.at(-1));
  let maxRating = Math.max(...contestRating);

  const tm = data.result.map((ct) => {
    return new Date(ct.ratingUpdateTimeSeconds * 1000);
  });
  return (
    <Container>
      <div
        style={{
          display: "flex",
          // justifyContent: "center",
          flexDirection: "column",
          borderWidth: "0.15rem",
          borderColor: "#052e16",
          padding: "1rem",
          borderRadius: "1rem",
          fontFamily: "Alegeraya",
          color: "black",
          width: "90%",
        }}
      >
        <a
          href={`https://codeforces.com/profile/${CfId}`}
          target="blank_"
          style={{
            display: "flex",
            flexDirection: "row",
            verticalAlign: "bottom",
            color: "black",
          }}
        >
          <img
            src={cmc}
            style={{
              height: "2.5rem",
              borderRadius: "0.5rem",

              marginRight: "1rem",
            }}
          />
          <p
            style={{
              fontWeight: "bold",
              marginTop: "auto",

              fontSize: "1.5rem",
            }}
          >
            {CfId}
          </p>
        </a>

        <p style={{ marginRight: "auto" }}>
          Latest Contest Rating: <b>{contestRating.at(-1)}</b> (max:{" "}
          <b>{maxRating}</b>)
        </p>
        <Graph data={contestRating} xseries={tm} />
      </div>
    </Container>
  );
}
