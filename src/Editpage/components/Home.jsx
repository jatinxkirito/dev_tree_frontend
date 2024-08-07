import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";
import { Avatar } from "@mui/material";

export default function HomeForm() {
  const { name } = useParams();
  const [editWindow, toggleeditWindow] = useState(false);
  const { isLoading, error, data } = useQuery({
    queryKey: `Home${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/base`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  return (
    <div>
      {editWindow && (
        <ImageUploader
          img={data.data.picture}
          toggleeditWindow={toggleeditWindow}
        />
      )}
      <Avatar
        src={data.data.picture}
        alt={data.data.name}
        sx={{ height: "8rem", width: "8rem" }}
        className="shadow-lg shadow-gray-800"
      />
      <button
        onClick={() => {
          toggleeditWindow(true);
        }}
      >
        Edit image
      </button>
    </div>
  );
}
