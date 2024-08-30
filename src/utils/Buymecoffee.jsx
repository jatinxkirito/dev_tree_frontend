export default function Coffee() {
  return (
    <a
      target="_blank"
      href="https://www.buymeacoffee.com/jatin_madaan"
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "#047857",
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "Pacifico",
        color: "#FFFFFF",
        fontSize: "1.2rem",
        borderRadius: "1rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        marginTop: "1rem",
      }}
      className="shadow-md shadow-gray-800"
    >
      <img
        src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
        alt="Buy me a coffee"
        style={{ height: "2.5rem" }}
      />
      <p style={{ marginLeft: "1rem" }}>Buy me a coffee</p>
    </a>
  );
}
