import Container from "./Container";
import CircleIcon from "@mui/icons-material/Circle";
const lst = [
  "Expert at Codeforces(max 1627)",
  "4 star at codechef(max 1993)",
  "Knight at LeetCode(max 1946)",
  "Rank 55 at ICPC Kanpur Regionals 2023",
  "AIR 2 in Mercer Mettl CodeSmash 2.0",
  "Top 50 in Mercer Mettl AI Arena",
  "Rank 1 in Intra College Coding Competition Blaze Battle (IIIT Sonepat)",
];
function Facts({ data }) {
  return (
    <li
      style={{
        //  width: "50%",
        // borderRadius: "2rem",
        // borderWidth: "0.15rem",
        // borderColor: "#052e16",
        display: "flex",
        // flexDirection: "column",
        fontWeight: "bold",
        margin: "1rem",
        justifyContent: "left",
        textWrap: "wrap",
      }}
    >
      <CircleIcon
        style={{
          backgroundColor: "#052e16",
          fontSize: "0.5rem",
          margin: "auto",
          borderRadius: "0.5rem",
          marginRight: "0.5rem",
        }}
      />
      {data}
    </li>
  );
}
export default function Achievments() {
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
        Achievments
      </div>
      <div
        style={{
          width: "80%",
          maxWidth: "60rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "left",
          }}
        >
          {lst.map((data, i) => {
            return <Facts data={data} key={i} />;
          })}
        </ul>
      </div>
    </Container>
  );
}
