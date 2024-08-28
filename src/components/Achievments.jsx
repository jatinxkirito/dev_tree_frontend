import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import CircleIcon from "@mui/icons-material/Circle";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
import Empty from "../utils/Empty";

function Facts({ data }) {
  return (
    <li
      style={{
        display: "flex",
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
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `Achievments${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/achievments`).then(
        (res) => res.json()
      ),
  });
  if (isLoading)
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (!data || !data.data || !data.data.achievments || error) return <ErrorC />;
  var lst = data.data.achievments;
  return (
    <Container>
      {lst.length == 0 && <Empty />}
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
