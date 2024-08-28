import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import { CircularProgress } from "@mui/material";
import ProgressBar from "./Progress";

import LcContest from "./Lccontest";
import LcGraph from "./LcGraph";
import Empty from "../utils/Empty";
import ErrorC from "../utils/ErrorC";
export default function LeetCode({ LeetcodeId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Leetcode${LeetcodeId}Data`,
    queryFn: () =>
      fetch(`https://alfa-leetcode-api.onrender.com/${LeetcodeId}`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) return <CircularProgress color="inherit" />;
  if (!data || error)
    return (
      <div>
        <ErrorC />
      </div>
    );

  if (data.errors && data.errors.length != 0)
    return (
      <div>
        <ErrorC msg={data.errors[0].message} />
      </div>
    );

  return (
    <Container>
      <div style={{ width: "90%" }}>
        {data.username == "undefined" || data.username == "" ? (
          <Empty msg="Seems like I am not that intersted in LeetCode" />
        ) : (
          <div
            style={{
              display: "flex",
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
              <LcContest LeetcodeId={LeetcodeId} />
              <ProgressBar LeetcodeId={LeetcodeId} />
            </div>
            <LcGraph LeetcodeId={LeetcodeId} />
          </div>
        )}
      </div>
    </Container>
  );
}
