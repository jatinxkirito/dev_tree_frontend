import { useQuery } from "@tanstack/react-query";
import Container from "./Container";
import { CircularProgress } from "@mui/material";

import github from "../assets/githublogo.png";

export default function Github({ GithubId = undefined }) {
  const { isLoading, error, data } = useQuery({
    queryKey: `Github${Github}Data`,
    queryFn: () =>
      fetch(`https://api.github.com/users/${GithubId}`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return <div>Loading</div>;

  return (
    <Container>
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && (
        <div style={{ width: "fit-content" }}>
          <img
            src={github}
            style={{
              width: "14rem",
              height: "auto",
              marginBottom: "2rem",
              marginInline: "auto",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              borderWidth: "0.15rem",
              borderColor: "#052e16",
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                //alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                className="inline-flex"
                style={{
                  //   borderWidth: "0.15rem",
                  //   borderColor: "#052e16",
                  padding: "0.5rem",
                  borderRadius: "1rem",
                  fontFamily: "Alegeraya",
                  color: "black",
                  alignItems: "center",
                }}
              >
                <img
                  src={data.avatar_url}
                  style={{
                    height: "6rem",
                    width: "6rem",
                    borderRadius: "1.2rem",
                    marginRight: "1rem",
                  }}
                  className="shadow-lg shadow-gray-800"
                />
                <div
                  style={{
                    justifyItems: "left",
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "1rem",
                  }}
                >
                  <p
                    style={{
                      marginLeft: "0",
                      marginRight: "auto",
                      fontWeight: "bold",
                    }}
                  >
                    {data.name}
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    <a href={data.html_url}>
                      <u>{data.login}</u>
                    </a>
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    Public Repositories: {data.public_repos}
                  </p>
                  <p style={{ marginLeft: "0", marginRight: "auto" }}>
                    Followers: {data.followers}
                  </p>
                </div>
              </div>

              <img
                src={`https://github-readme-stats.vercel.app/api?username=${GithubId}&theme=shadow_green&hide_border=true&include_all_commits=false&count_private=false`}
                style={{ height: "11rem" }}
              />

              {/* <LcContest LeetcodeId="jatinxkirito" />
              <ProgressBar LeetcodeId="jatinxkirito" /> */}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                //alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${GithubId}&theme=shadow_green&hide_border=true`}
                style={{ height: "10.5rem" }}
              />
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GithubId}&theme=shadow_green&hide_border=true&include_all_commits=false&count_private=false&layout=compact`}
              />
            </div>
            {/* <LcGraph LeetcodeId="jatinxkirito" /> */}
            <img
              src={`https://ghchart.rshah.org/${GithubId}`}
              alt={`${GithubId}'s contribution heatmap`}
            ></img>
          </div>
        </div>
      )}
    </Container>
  );
}
