import { CloseRounded } from "@mui/icons-material";
import { useRef, useState } from "react";

import Cropper from "react-easy-crop";

export default function ImageUploader({
  img,
  toggleeditWindow,
  gotToHome,
  updateImage,
  rw,
  rh,
  shape,
}) {
  const [userImage, setUserImage] = useState(img);
  const [err, setErr] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
    // console.log(croppedAreaPercentage, croppedAreaPixels);
  };
  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "devtree_profile");
    data.append("cloud_name", "dd9t8dh5w");
    toggleeditWindow();
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd9t8dh5w/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const ans = await res.json();
      //if (imgId) await cloudinary.uploader.destroy(imgId);
      updateImage(ans.url, ans.public_id).then((res) => {
        window.location.reload(false);
        gotToHome();
      });

      console.log(ans);
    } catch (err) {
      console.log(err);
    }
  };
  const onCropFinal = async () => {
    const canvas = document.createElement("canvas");
    //console.log(croppedArea);
    canvas.width = croppedArea.width;
    canvas.height = croppedArea.height;
    //console.log(canvas);
    const context = canvas.getContext("2d");
    let imgObj = new Image();
    imgObj.src = userImage;
    // console.log(imgObj);
    imgObj.onload = async function () {
      context.drawImage(
        imgObj,
        croppedArea.x,
        croppedArea.y,
        croppedArea.width,
        croppedArea.height,
        0,
        0,
        croppedArea.width,
        croppedArea.height
      );
      //console.log(context.getImageData(0, 0, canvas.width, canvas.height));
      //console.log(canvas);
      const dataUrl = canvas.toDataURL("image/jpeg");

      await uploadImage(dataUrl);
      console.log(dataUrl);
      setUserImage(dataUrl);
    };
  };
  const onChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      const fileSize = e.target.files[0].size;
      const fileMb = fileSize / 1024 ** 2;
      if (fileMb > 10) {
        setErr("File size can't exceed 10mb");
        return;
      }
      //console.log("pikachu", URL.createObjectURL(e.target.files[0]), userImage);
      setUserImage(URL.createObjectURL(e.target.files[0]));
    }
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
          gotToHome();
        }}
        style={{ position: "absolute", top: "1rem", right: "1rem" }}
      >
        <CloseRounded />
      </button>
      <Cropper
        //cropSize={{ height: "20rem" }}

        cropShape={shape}
        style={{
          containerStyle: {
            height: "30rem",
            width: "30rem",
            position: "relative",
          },
        }}
        image={userImage}
        crop={crop}
        zoom={zoom}
        aspect={rw / rh}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <input type="file" accept="image/*" onChange={onChange} />
      <div type>{err}</div>
      <button onClick={onCropFinal}>Apply</button>
    </div>
  );
}
