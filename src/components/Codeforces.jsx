import { useQuery } from "@tanstack/react-query";
import cf from "../assets/Codeforces_logo.svg.png";
import cmc from "../assets/Codeforces.webp";
//import crypto from "crypto";
import Container from "./Container";
import Graph from "./graph";
export default function Cf({ CfId = "jatinxkirito" }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Cf${CfId}Data`,
    queryFn: () =>
      fetch(`https://codeforces.com/api/user.rating?handle=${CfId}`).then(
        (res) => res.json()
      ),
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  if (error) return <div>Couldn&apos;t load codeforces</div>;
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
      <img
        src={cf}
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
