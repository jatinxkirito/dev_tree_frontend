import Achievments from "../components/Achievments";
import Education from "../components/Education";
import Work from "../components/Work";

export default function Professional() {
  return (
    <>
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
        Education
      </div>
      <Education />
      <div
        style={{
          color: "#052e16",
          fontSize: "3rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          //marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Work Experience
      </div>
      <Work />
      <div
        style={{
          color: "#052e16",
          fontSize: "3rem",
          fontFamily: "Alegreya",
          fontWeight: "bold",
          //marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Achievments
      </div>
      <Achievments />
    </>
  );
}
