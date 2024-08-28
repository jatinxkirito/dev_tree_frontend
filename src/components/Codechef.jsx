import { useQuery } from "@tanstack/react-query";

import ccs from "../assets/Codechef.png";

import Container from "./Container";
import Graph from "./graph";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
export default function Cc({ CcId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Codechef${CcId}Data`,
    queryFn: () =>
      fetch(`https://codechef-api.vercel.app/${CcId}`).then((res) =>
        res.json()
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
        <ErrorC />
      </div>
    );
  console.log(data);
  if (data.success == false)
    return (
      <div>
        <ErrorC msg="Couldn't fetch the data" />
      </div>
    );
  var contestRating = data.ratingData.map((ct) => {
    return ct.rating;
  });

  let maxRating = Math.max(...contestRating);
  const tm = data.ratingData.map((ct) => {
    return new Date(Date.parse(ct.end_date));
  });

  return (
    <Container>
      <div
        style={{
          display: "flex",

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
          href={`https://www.codechef.com/users/${CcId}`}
          target="blank_"
          style={{
            display: "flex",
            flexDirection: "row",
            verticalAlign: "bottom",
            color: "black",
          }}
        >
          <img
            src={ccs}
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
            {CcId}
          </p>
        </a>

        <p style={{ marginRight: "auto" }}>
          Latest Contest Rating: <b>{contestRating.at(-1)}</b> (max:{data.stars}
          ,<b>{maxRating}</b>)
        </p>
        <Graph data={contestRating} xseries={tm} />
      </div>
    </Container>
  );
}
