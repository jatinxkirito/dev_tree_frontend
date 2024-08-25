import { useQuery } from "@tanstack/react-query";
import Github from "../components/Github";
import Project from "../components/Projects";
import { useParams } from "react-router-dom";
import githb from "../assets/githublogo.png";
import { CircularProgress } from "@mui/material";
import ErrorC from "../utils/ErrorC";
export default function Work() {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `Work${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/work`).then(
        (res) => res.json()
      ),
  });

  let github = undefined;

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (!data || !data.data || error) <ErrorC />;
  if (data) github = data.data.github;
  // const { navigation } = this.props;
  // const username = navigation.getParam("comp", {});
  return (
    <div>
      {github && github != "" && (
        <>
          <img
            src={githb}
            style={{
              width: "14rem",
              height: "auto",
              marginBottom: "1rem",
              marginTop: "1rem",
              marginInline: "auto",
            }}
          />
          <Github GithubId={github} />
        </>
      )}
      <Project projectList={data.data.projects} />
    </div>
  );
}
