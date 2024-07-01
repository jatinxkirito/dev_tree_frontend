import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import { Avatar, CircularProgress } from "@mui/material";
import ProgressBar from "./Progress";
import LcImg from "../assets/Leetcode.png";
import LcContest from "./Lccontest";
import LcGraph from "./LcGraph";
export default function LeetCode({ LeetcodeId = "jatinxkirito" }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Leetcode${LeetcodeId}Data`,
    queryFn: () =>
      fetch(`https://alfa-leetcode-api.onrender.com/${LeetcodeId}`).then(
        (res) => res.json()
      ),
  });
  if (error) return <div>Failed to load data</div>;
  return (
    <Container>
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && (
        <div style={{ width: "90%" }}>
          <img
            src={LcImg}
            style={{
              width: "14rem",
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
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                //alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div
                className="inline-flex"
                style={{
                  borderWidth: "0.15rem",
                  borderColor: "#052e16",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontFamily: "Alegeraya",
                  color: "black",
                  alignItems: "center",
                }}
              >
                <img
                  src={data.avatar}
                  style={{
                    height: "6rem",
                    width: "6rem",
                    borderRadius: "1.2rem",
                    marginRight: "1rem",
                  }}
                  className="shadow-lg shadow-gray-800"
                />
                <div
                  style={{
                    justifyItems: "left",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "0",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    {data.name}
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    <a href={`https://leetcode.com/u/${data.username}/`}>
                      <u>{data.username}</u>
                    </a>
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    Reputaion: {data.reputation}
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    Rank: {data.ranking}
                  </p>
                </div>
              </div>
              <LcContest LeetcodeId="jatinxkirito" />
              <ProgressBar LeetcodeId="jatinxkirito" />
            </div>
            <LcGraph LeetcodeId="jatinxkirito" />
          </div>
        </div>
      )}
    </Container>
  );
}
