import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";
import { Avatar } from "@mui/material";
import axios from "axios";

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
      console.log(err);
    }
  };
  const { isLoading, error, data } = useQuery({
    queryKey: `Home${name}Data`,
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/base`).then(
        (res) => res.json()
      ),
  });
  if (isLoading || editWindow == "load") return <div>Loading...</div>;
  if (error) return <div>error</div>;
  return (
    <div>
      {editWindow == "upload" && (
        <ImageUploader
          img={data.data.picture}
          toggleeditWindow={toggleeditWindow}
          updateImage={updateImage}
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
        Edit User image
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
                linkedin: document.getElementsByClassName("linkedin")[0].value,
                job: document.getElementsByClassName("job")[0].value,
                description:
                  document.getElementsByClassName("description")[0].value,
              }
            );
            window.location.reload(false);
            toggleeditWindow("home");
            console.log(df); // console.log(data.profile.picture);
          } catch (err) {
            console.log(err);
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
          <label for="Name" style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            Name:
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
            Job:
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
          <label
            for="linkedin"
            style={{ fontSize: "1.1rem", fontWeight: "bold" }}
          >
            linkedin:
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
            github:
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
            required={true}
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
          required={true}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
