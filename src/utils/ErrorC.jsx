import { SentimentDissatisfiedRounded } from "@mui/icons-material";

export default function ErrorC({ msg = "Look's like something went wrong" }) {
  return (
    <div style={{ fontSize: "1.2rem" }}>
      <SentimentDissatisfiedRounded />
      <div>{msg}</div>
    </div>
  );
}
