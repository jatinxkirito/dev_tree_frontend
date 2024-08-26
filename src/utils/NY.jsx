import { SentimentDissatisfiedRounded } from "@mui/icons-material";

export default function NY({ msg = "Got some work to do here Yeah buddy!" }) {
  return (
    <div
      style={{
        fontSize: "2rem",
        height: "30vh",
        backgroundColor: "#d9e1d9",
        alignItems: "center",
        width: "100%",
      }}
    >
      <SentimentDissatisfiedRounded style={{ marginTop: "8vh" }} />
      <div>{msg}</div>
    </div>
  );
}
