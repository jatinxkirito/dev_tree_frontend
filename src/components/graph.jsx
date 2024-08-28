import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function Graph({ data, xseries }) {
  return (
    <div
      style={{
        borderWidth: "0.15rem",
        borderColor: "#052e16",

        borderRadius: "1rem",
        width: "100%",
        marginInline: "auto",
        marginTop: "1rem",
        height: "18rem",
      }}
    >
      <LineChart
        xAxis={[{ data: xseries, scaleType: "time" }]}
        series={[
          {
            data: data,
            color: "#052e16",
          },
        ]}
        rightAxis={null}
        disableAxisListener
      />
    </div>
  );
}
