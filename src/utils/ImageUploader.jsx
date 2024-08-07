import { CloseRounded } from "@mui/icons-material";
import { transform } from "framer-motion";
import { useRef, useState } from "react";

export default function ImageUploader({ img, toggleeditWindow }) {
  const inputRef = useRef();
  const [userImage, setUserImage] = useState(img);
  const [err, setErr] = useState("");
  const onChange = (e) => {
    console.log("maglu");
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      const fileSize = e.target.files[0].size;
      const fileMb = fileSize / 1024 ** 2;
      if (fileMb > 10) {
        setErr("File size can't exceed 10mb");
        return;
      }
      setUserImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const onSelect = () => {
    console.log("img");
    inputRef.current.click();
  };
  return (
    <div
      style={{
        zIndex: 1000,
        position: "fixed",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5",
        top: "0",
        left: "0",
        color: "white",
      }}
    >
      <button
        onClick={() => {
          toggleeditWindow(false);
        }}
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        <CloseRounded />
      </button>
      <img
        src={userImage}
        alt="User Image here"
        style={{ height: "20rem", width: "fit-content" }}
      />
      <input type="file" accept="image/*" onChange={onChange} />

      <div type>{err}</div>
    </div>
  );
}
