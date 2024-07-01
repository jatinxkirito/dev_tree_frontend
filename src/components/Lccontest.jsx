import { useQuery } from "@tanstack/react-query";
function Cmp({ name, info }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontWeight: "bold",
        marginInline: "0.8rem",
      }}
    >
      <div>{name}</div>
      <div style={{ color: "#047857" }}>{info}</div>
    </div>
  );
}
export default function LcContest({ LeetcodeId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Leetcode${LeetcodeId}ContestData`,
    queryFn: () =>
      fetch(
        `https://alfa-leetcode-api.onrender.com/${LeetcodeId}/contest`
      ).then((res) => res.json()),
  });
  if (isLoading) return <div>Loading...</div>;
  return (
    <div
      style={{
        borderWidth: "0.15rem",
        borderColor: "#052e16",
        padding: "0.5rem",
        borderRadius: "1rem",
        fontFamily: "Alegeraya",
        color: "black",
        display: "flex",
        direction: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Cmp
        name="Contest Rating"
        info={Math.round(data.contestRating)}
        key="Contest Rating"
      />

      {data.contestBadges && (
        <Cmp name="Level" info={data.contestBadges.name} key="Contest Badges" />
      )}
      <Cmp
        name="Global Ranking"
        info={`${data.contestGlobalRanking}/${data.totalParticipants}`}
        key="Global Ranking"
      />
      <Cmp name="Top" info={`${data.contestTopPercentage}%`} key="Top" />
      <Cmp
        name="Attended"
        info={Math.round(data.contestAttend)}
        key="Attended"
      />
    </div>
  );
}
