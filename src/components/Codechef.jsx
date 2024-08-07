import { useQuery } from "@tanstack/react-query";
import cc from "../assets/cc.jpeg";
import ccs from "../assets/Codechef.png";
//import crypto from "crypto";
import Container from "./Container";
import Graph from "./graph";
export default function Cc({ CcId = "jatin_kirito" }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Codechef${CcId}Data`,
    queryFn: () =>
      fetch(`https://codechef-api.vercel.app/${CcId}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  if (data.success == false) return <div>error</div>;
  var contestRating = data.ratingData.map((ct) => {
    return ct.rating;
  });

  //console.log(contestRating.at(-1));
  let maxRating = Math.max(...contestRating);
  const tm = data.ratingData.map((ct) => {
    return new Date(Date.parse(ct.end_date));
  });
  //console.log(tm);
  return (
    <Container>
      <img
        src={cc}
        style={{
          width: "16rem",
          height: "auto",
          marginBottom: "2rem",
          marginInline: "auto",
        }}
      />
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
