import { useQuery } from "@tanstack/react-query";
import Cc from "../components/Codechef";
import Cf from "../components/Codeforces";
import LeetCode from "../components/Lc";
import { useParams } from "react-router-dom";
import LcImg from "../assets/Leetcode.png";
import cf from "../assets/Codeforces_logo.svg.png";
import cc from "../assets/cc.jpeg";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
export default function Cp() {
  const { name } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: `${name}_cp_data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/cp`).then((res) =>
        res.json()
      ),
  });
  if (isLoading)
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (error) return <ErrorC />;
  //console.log(data);
  if (
    (!data.data.leetcode || data.data.leetcode == "") &&
    (!data.data.codeforces || data.data.codeforces == "") &&
    (!data.data.codechef || data.data.codechef == "")
  )
    return <ErrorC msg="Not much of a coder are we?" />;
  return (
    <>
      {data.data.leetcode && data.data.leetcode != "" && (
        <>
          <img
            src={LcImg}
            style={{
              width: "14rem",
              height: "auto",

              marginInline: "auto",
              marginTop: "1rem",
            }}
          />
          <LeetCode LeetcodeId={data.data.leetcode} />
        </>
      )}
      {data.data.codeforces && data.data.codeforces != "" && (
        <>
          <img
            src={cf}
            style={{
              width: "16rem",
              height: "auto",
              marginBottom: "2rem",
              marginInline: "auto",
            }}
          />

          <Cf CfId={data.data.codeforces} />
        </>
      )}

      {data.data.codechef && data.data.codechef != "" && (
        <>
          <img
            src={cc}
            style={{
              width: "16rem",
              height: "auto",
              marginBottom: "2rem",
              marginInline: "auto",
            }}
          />
          <Cc CcId={data.data.codechef} />
        </>
      )}
    </>
  );
}
