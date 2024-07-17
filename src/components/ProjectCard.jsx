import { AspectRatio, GitHub, Info } from "@mui/icons-material";
import IconLink from "./IconLink";
import LinkIcon from "@mui/icons-material/Link";
export default function ProjectCard({ img, info, title, github, deploy }) {
  return (
    <div
      style={{
        width: "15rem",
        borderRadius: "2rem",
        transitionDuration: "0.5s",
        backgroundColor: "white",
        color: "black",
        fontFamily: "Alegeraya",
        margin: "1rem",
      }}
      className="shadow-md  hover:shadow-2xl"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          backgroundColor: "#acbeb5",
          borderTopLeftRadius: "2rem",
          borderTopRightRadius: "2rem",
        }}
      >
        <img
          src={img}
          style={{
            width: "100%",
            height: "auto",
            overflow: "hidden",
            borderTopLeftRadius: "2rem",
            borderTopRightRadius: "2rem",
          }}
        />
      </div>
      <div
        style={{
          height: "11rem",
          textWrap: "wrap",
          color: "black",
          fontSize: "0.65rem",
          textAlign: "left",
          padding: "0.5rem",
        }}
      >
        <div
          style={{ fontWeight: "bold", fontSize: "1.2rem", textWrap: "pretty" }}
        >
          {title}
        </div>

        {info}
      </div>
      <div
        style={{
          width: "50%",
          marginBottom: "0.5rem",
          display: "flex",
          justifyContent: "space-around",
          marginInline: "auto",
        }}
      >
        {deploy && (
          <IconLink Component={LinkIcon} color="black" link={github} />
        )}
        <IconLink Component={GitHub} color="black" link={deploy} />
      </div>
    </div>
  );
}
