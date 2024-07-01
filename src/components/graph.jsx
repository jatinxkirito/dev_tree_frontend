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
        // aspectRatio: 5 / 16,
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
        // height={300}
        // margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        //grid={{ vertical: true, horizontal: true }}
        //leftAxis={null}
        rightAxis={null}
        // bottomAxis={null}
        disableAxisListener
      />
    </div>
  );
}
