import i404 from "../assets/404image.png";
export default function Protection() {
  return (
    <div style={{ fontSize: "2rem", fontWeight: "bold", color: "black" }}>
      <img
        src={i404}
        style={{ marginLeft: "auto", marginRight: "auto", height: "40vh" }}
      />
      <p>Oops!</p>
      <p>Looks like something went wrong</p>
    </div>
  );
}
