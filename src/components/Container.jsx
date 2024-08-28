export default function Container({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
