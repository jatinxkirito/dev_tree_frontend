export default function IconLink({ Component, link, color = "#047857" }) {
  return (
    <a href={link} target="_blank">
      <Component target="_blank" sx={{ color: color }} />
    </a>
  );
}
