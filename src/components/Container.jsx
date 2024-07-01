export default function Container({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-evenly",
        alignItems: "center",
        // Items: "center",
        padding: "2rem",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
