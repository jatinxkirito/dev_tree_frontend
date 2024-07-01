import Container from "./Container";
import ProjectCard from "./ProjectCard";

export default function Project() {
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
        <ProjectCard
          img="https://www.security101.com/hs-fs/hubfs/Intelligent-and-collaborative-video-surveillance-systems.png?width=800&height=400&name=Intelligent-and-collaborative-video-surveillance-systems.png"
          title="Ready Player One"
          deploy="dkl"
          info={`Sword Art Online (Japanese: ソードアート・オンライン, Hepburn: Sōdo Āto Onrain) is a Japanese light novel series written by Reki Kawahara and illustrated by abec. The series takes place in the 2020s and focuses on protagonists Kazuto "Kirito" Kirigaya and Asuna Yuuki as they play through various virtual reality MMORPG worlds, and later their involvement in the matters of a simulated civilization`}
        />
        <ProjectCard
          img="https://www.security101.com/hs-fs/hubfs/Intelligent-and-collaborative-video-surveillance-systems.png?width=800&height=400&name=Intelligent-and-collaborative-video-surveillance-systems.png"
          title="Ready Player One"
          deploy="dkl"
          info={`Sword Art Online (Japanese: ソードアート・オンライン, Hepburn: Sōdo Āto Onrain) is a Japanese light novel series written by Reki Kawahara and illustrated by abec. The series takes place in the 2020s and focuses on protagonists Kazuto "Kirito" Kirigaya and Asuna Yuuki as they play through various virtual reality MMORPG worlds, and later their involvement in the matters of a simulated civilization`}
        />
        <ProjectCard
          img="https://www.security101.com/hs-fs/hubfs/Intelligent-and-collaborative-video-surveillance-systems.png?width=800&height=400&name=Intelligent-and-collaborative-video-surveillance-systems.png"
          title="Ready Player One"
          deploy="dkl"
          info={`Sword Art Online (Japanese: ソードアート・オンライン, Hepburn: Sōdo Āto Onrain) is a Japanese light novel series written by Reki Kawahara and illustrated by abec. The series takes place in the 2020s and focuses on protagonists Kazuto "Kirito" Kirigaya and Asuna Yuuki as they play through various virtual reality MMORPG worlds, and later their involvement in the matters of a simulated civilization`}
        />
        <ProjectCard
          img="https://www.security101.com/hs-fs/hubfs/Intelligent-and-collaborative-video-surveillance-systems.png?width=800&height=400&name=Intelligent-and-collaborative-video-surveillance-systems.png"
          title="Ready Player One"
          deploy="dkl"
          info={`Sword Art Online (Japanese: ソードアート・オンライン, Hepburn: Sōdo Āto Onrain) is a Japanese light novel series written by Reki Kawahara and illustrated by abec. The series takes place in the 2020s and focuses on protagonists Kazuto "Kirito" Kirigaya and Asuna Yuuki as they play through various virtual reality MMORPG worlds, and later their involvement in the matters of a simulated civilization`}
        />
        <ProjectCard
          img="https://www.security101.com/hs-fs/hubfs/Intelligent-and-collaborative-video-surveillance-systems.png?width=800&height=400&name=Intelligent-and-collaborative-video-surveillance-systems.png"
          title="Ready Player One"
          deploy="dkl"
          info={`Sword Art Online (Japanese: ソードアート・オンライン, Hepburn: Sōdo Āto Onrain) is a Japanese light novel series written by Reki Kawahara and illustrated by abec. The series takes place in the 2020s and focuses on protagonists Kazuto "Kirito" Kirigaya and Asuna Yuuki as they play through various virtual reality MMORPG worlds, and later their involvement in the matters of a simulated civilization`}
        />
      </div>
    </Container>
  );
}
