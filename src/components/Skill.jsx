export default function Skl({ skill }) {
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        paddingLeft: "0.3rem",
        paddingRight: "0.3rem",
        borderColor: "#047857",
        maxWidth: "14rem",
        color: "#047857",
        fontSize: "0.9rem",
        textWrap: "pretty",
        fontWeight: "bold",
        fontFamily: "Alegreya",
        borderRadius: "0.8rem",
        margin: "0.25rem",
        borderWidth: "0.01rem",
      }}
      className="shadow-sm shadow-gray-800"
    >
      {skill}
    </div>
  );
}
