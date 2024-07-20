import { useQuery } from "@tanstack/react-query";
import Cc from "../components/Codechef";
import Cf from "../components/Codeforces";
import LeetCode from "../components/Lc";
import { useParams } from "react-router-dom";

export default function Cp() {
  const { name } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: `${name}_cp_data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/cp`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return <div>Loading....</div>;
  console.log(data);
  return (
    <>
      <LeetCode LeetcodeId={data.data.leetcode} />
      <Cf CfId={data.data.codeforces} />
      <Cc CcId={data.data.codechef} />
    </>
  );
}
