import { useQuery } from "@tanstack/react-query";
import Github from "../components/Github";
import Project from "../components/Projects";
import { useParams } from "react-router-dom";

export default function Work() {
  const { name } = useParams();
  const { isLoading, error, data } = useQuery({
    queryKey: `Work${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/work`).then(
        (res) => res.json()
      ),
  });
  console.log(data);
  let github = undefined;
  if (data) github = data.data.github;
  if (isLoading) return <div>Loading...</div>;
  // const { navigation } = this.props;
  // const username = navigation.getParam("comp", {});
  return (
    <div>
      <Github GithubId={github} />
      <Project projectList={data.data.projects} />
    </div>
  );
}
