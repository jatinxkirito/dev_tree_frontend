import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";
import { Avatar, CircularProgress } from "@mui/material";
import axios from "axios";
import ErrorC from "../../utils/ErrorC";
import Sbmt from "../../utils/SubmitBtn";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function HomeForm() {
  const { name } = useParams();
  const [editWindow, toggleeditWindow] = useState("home");
  const updateImage = async (url, public_id) => {
    try {
      const df = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/userDp`,
        { picture: url, name, public_id }
      );
    } catch (err) {
      toast.error("Couldn't update image", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const { isLoading, error, data } = useQuery({
    queryKey: `Home${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/base`).then(
        (res) => res.json()
      ),
  });
  if (isLoading || editWindow == "load")
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (error)
    return (
      <div>
        <ErrorC />
      </div>
    );
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div>
        {editWindow == "upload" && (
          <ImageUploader
            img={data.data.picture}
            toggleeditWindow={() => toggleeditWindow("load")}
            gotToHome={() => {
              toggleeditWindow("home");
            }}
            updateImage={updateImage}
            rw={1}
            rh={1}
            shape="round"
          />
        )}
        <Avatar
          src={data.data.picture}
          alt={data.data.name}
          sx={{
            height: "8rem",
            width: "8rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "1rem",
          }}
          className="shadow-lg shadow-gray-800"
        />
        <button
          onClick={() => {
            toggleeditWindow("upload");
          }}
        >
          <b> Edit User image</b>
        </button>
        <hr
          style={{
            borderStyle: "solid",
            borderWidth: "0.07rem",
            borderColor: "#047857",
          }}
        />
        <form
          style={{ width: "100%" }}
          onSubmit={async function (e) {
            try {
              e.preventDefault();
              toggleeditWindow("load");
              const df = await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
                {
                  name: document.getElementsByClassName("name")[0].value,
                  github: document.getElementsByClassName("github")[0].value,
                  linkedin:
                    document.getElementsByClassName("linkedin")[0].value,
                  job: document.getElementsByClassName("job")[0].value,
                  description:
                    document.getElementsByClassName("description")[0].value,
                }
              );
              // window.location.reload(false);
              toggleeditWindow("home");
              // setData((prev) => ({ ...prev, state: -1 }));

              setTimeout(
                () =>
                  toast.success("Update Successful!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  }),
                50
              );
              setTimeout(() => window.location.reload(false), 300);

              // console.log(data.profile.picture);
            } catch (err) {
              toggleeditWindow("home");
              setTimeout(
                () =>
                  toast.error("Couldn't update data", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  }),
                50
              );
            }
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              direction: "row",
              marginTop: "0.8rem",
            }}
          >
            <label
              for="Name"
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              Name:<span style={{ color: "white" }}>.......</span>
            </label>
            <input
              type="text"
              className="name"
              name="name"
              style={{
                marginLeft: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. Abhimanyu"
              defaultValue={data.data.name ? data.data.name : ""}
              required={true}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              direction: "row",
              marginTop: "0.8rem",
            }}
          >
            <label for="job" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              Job:<span style={{ color: "white" }}>...........</span>
            </label>
            <input
              type="text"
              className="job"
              name="job"
              style={{
                marginLeft: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. Corporate Majdoor"
              defaultValue={data.data.job ? data.data.job : ""}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              direction: "row",
              marginTop: "0.8rem",
            }}
          >
            <label
              for="linkedin"
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              linkedin:<span style={{ color: "white" }}>...</span>
            </label>
            <input
              type="text"
              className="linkedin"
              name="linkedin"
              style={{
                marginLeft: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. https://www.linkedin.com/in/williamhgates/"
              defaultValue={data.data.linkedin ? data.data.linkedin : ""}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              direction: "row",
              marginTop: "0.8rem",
            }}
          >
            <label
              for="github"
              style={{ fontSize: "1.1rem", fontWeight: "bold" }}
            >
              github:<span style={{ color: "white" }}>.....</span>
            </label>
            <input
              type="text"
              className="github"
              name="github"
              style={{
                marginLeft: "0.5rem",
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. jatinxkirito"
              defaultValue={data.data.github ? data.data.github : ""}
            />
          </div>
          <label
            for="description"
            style={{
              fontSize: "1.1rem",
              marginRight: "100%",
              fontWeight: "bold",
            }}
          >
            Description:
          </label>

          <textarea
            type="text"
            className="description"
            name="description"
            rows="5"
            style={{
              width: "100%",
              backgroundColor: "white",
              borderWidth: "0.05rem",
              borderRadius: "0.5rem",
              borderColor: "black",
              padding: "0.5rem",
            }}
            placeholder="E.g. I am amazing software developer with top notch problem solving skills and business aptitude"
            defaultValue={data.data.description ? data.data.description : ""}
          />
          <br />
          <Sbmt />
        </form>
      </div>
    </>
  );
}
