import { PieChart } from "@mui/x-charts";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
function Ele({ label, color, solvedCount, totalCount }) {
  return (
    <div
      style={{
        fontSize: "1rem",
        color: "black",
        fontWeight: "bold",
        marginRight: "0.5rem",
      }}
    >
      <p style={{ color: color }}>{label}: </p> {solvedCount}/{totalCount}
    </div>
  );
}
function ProgressBar({ LeetcodeId }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Leetcode${LeetcodeId}`,
    queryFn: () =>
      fetch(`https://leetcode-api-faisalshohag.vercel.app/${LeetcodeId}`).then(
        (res) => res.json()
      ),
  });
  //console.log(data);
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div
          style={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            flexDirection: "row",
            borderRadius: "1rem",
            borderWidth: "0.15rem",
            borderColor: "#052e16",
          }}
        >
          <div
            style={{
              height: 200,
              width: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              padding: 0,
              color: "black",
            }}
          >
            <div
              style={{
                height: "10rem",
                width: "10rem",
                borderRadius: 100,
                zIndex: 2,
                position: "absolute",
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "2rem",
                  verticalAlign: "text-bottom",
                  fontWeight: "bold",
                }}
              >
                <p
                  style={{
                    fontFamily: "Alegreya",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  {data.totalSolved}/
                </p>
                {data.totalQuestions}
              </div>
              <p
                style={{
                  fontSize: "1.2rem",
                  marginTop: "0.5rem",
                  fontWeight: "bold",
                  fontFamily: "Alegreya",
                }}
              >
                ✅Solved
              </p>
            </div>
            <div
              style={{
                height: "12.5rem",
                width: "12.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                position: "absolute",
              }}
            >
              <PieChart
                series={[
                  {
                    data: [
                      {
                        value: data.easySolved,
                        color: "green",
                        label: `Easy: ${data.easySolved}`,
                      },
                      {
                        value: data.mediumSolved,
                        color: "#FFB700",
                        label: `Medium: ${data.mediumSolved}`,
                      },
                      {
                        value: data.hardSolved,
                        color: "red",
                        label: `Hard: ${data.hardSolved}`,
                      },
                      {
                        value: data.totalQuestions - data.totalSolved,
                        color: "#1f2937",
                      },
                    ],
                    innerRadius: 80,
                    outerRadius: 90,
                    paddingAngle: 1,
                    cornerRadius: 15,
                    startAngle: 0,
                    endAngle: 360,
                    cx: "100%",
                    cy: "50%",
                    // cy: 150,s
                  },
                ]}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Ele
              color="green"
              label="Easy"
              solvedCount={data.easySolved}
              totalCount={data.totalEasy}
            />
            <Ele
              color="#FFB700"
              label="Medium"
              solvedCount={data.mediumSolved}
              totalCount={data.totalMedium}
            />
            <Ele
              color="red"
              label="Hard"
              solvedCount={data.hardSolved}
              totalCount={data.totalHard}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default ProgressBar;
