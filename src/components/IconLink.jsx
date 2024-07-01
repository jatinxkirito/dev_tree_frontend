export default function IconLink({ Component, link, color = "#047857" }) {
  return (
    <a href={link} target="_blank">
      <Component
        // component="a"

        // href="https://www.linkedin.com/in/jatin-madaan-949423221/"
        target="_blank"
        sx={{ color: color }}
      />
    </a>
  );
}
