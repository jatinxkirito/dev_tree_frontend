import Container from "./Container";
import ProjectCard from "./ProjectCard";

export default function Project({ projectList }) {
  return (
    <Container>
      <div
        style={{
          color: "#052e16",
          fontSize: "3rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          marginTop: "1.5rem",
          marginBottom: "0.5rem",
        }}
      >
        Projects
      </div>
      <div
        style={{
          display: "flex",
          width: "80%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {projectList.length == 0 && (
          <div>Looks like we still have some work to do</div>
        )}
        {projectList.map((d, i) => {
          return (
            <ProjectCard
              key={i}
              img={d.image}
              title={d.name}
              info={d.description}
              github={d.githubLink}
              deploy={d.hostedLink}
            />
          );
        })}
      </div>
    </Container>
  );
}
