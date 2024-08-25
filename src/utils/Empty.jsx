export default function Empty({
  msg = "Work in progress, Please don't judge!",
}) {
  return (
    <div style={{ marginTop: "2rem", color: "grey", fontSize: "1.2rem" }}>
      {msg}
    </div>
  );
}
