import { useQuery } from "@tanstack/react-query";
import Graph from "./graph";
import { CircularProgress } from "@mui/material";

export default function LcGraph({ LeetcodeId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Leetcode${LeetcodeId}ContestData`,
    queryFn: () =>
      fetch(
        `https://alfa-leetcode-api.onrender.com/${LeetcodeId}/contest`
      ).then((res) => res.json()),
  });

  if (isLoading) return <CircularProgress color="inherit" />;
  if (data.contestParticipation.length == 0) return <></>;

  const ratings = data.contestParticipation.map((ct) => {
    return Math.round(ct.rating);
  });
  const tm = data.contestParticipation.map((ct) => {
    return new Date(ct.contest.startTime * 1000);
  });
  return <Graph data={ratings} xseries={tm} />;
}
