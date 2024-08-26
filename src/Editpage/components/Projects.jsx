import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";
import { AddCircle, Delete } from "@mui/icons-material";
import Sbmt from "../../utils/SubmitBtn";

export default function ProjectForm() {
  const { name } = useParams();

  const [data, setData] = useState({ state: -2 });
  let del = [];

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/projects`)
      .then((res) => {
        console.log(res);
        setData({ loading: -1, lst: res.data.data.projects });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: -1, error });
      });
  }, []);

  if (data.state == -2) return <div>Loading...</div>;
  if (data.error) return <div>Loading...</div>;
  // console.log(data.lst);

  var lst = data.lst;
  //console.log(lst[0]);
  //console.log(data);
  //var lst = data.data.education;

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={async function (e) {
        try {
          e.preventDefault();
          const Name = document.querySelectorAll(".Name");
          const github = document.querySelectorAll(".github");
          const live = document.querySelectorAll(".live");
          const description = document.querySelectorAll(".description");

          var newLst = [];
          //console.log(Degree.length);
          for (let i = 0; i < Name.length; i++) {
            newLst.push({
              name: Name[i].value,
              github: github[i].value,
              live: live[i].value,
              description: description[i].value,
              image: lst[i].image ? lst[i].image._id : undefined,
            });
          }
          setData({ ...data, state: -2 });
          const df = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/updateProject/${name}`,
            { projects: newLst }
          );
          window.location.reload(false);
          //console.log(df); // console.log(data.profile.picture);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {lst.map((item, index) => {
        return (
          <div key={index} style={{ marginBottom: "1rem" }}>
            {data.state == index && (
              <ImageUploader
                img={
                  item.image
                    ? item.image.url
                    : "https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg"
                }
                toggleeditWindow={() => {
                  setData({ ...data, state: -2 });
                }}
                gotToHome={() => setData({ ...data, state: -1 })}
                updateImage={async (url, public_id) => {
                  try {
                    if (lst[index].image) {
                      const df = await axios.patch(
                        `${
                          import.meta.env.VITE_BACKEND_URL
                        }/api/updateProjectImage`,
                        { url, public_id, id: lst[index].image._id }
                      );
                    } else {
                      const df = await axios.post(
                        `${
                          import.meta.env.VITE_BACKEND_URL
                        }/api/createProjectImage`,
                        { url, public_id }
                      );
                      console.log(df.data.data._id);
                      lst[index].image = df.data.data._id;
                      await axios.patch(
                        `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
                        {
                          projects: lst,
                        }
                      );
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
                rw={240}
                rh={135}
                shape="rect"
              />
            )}

            <h1 style={{ fontSize: "2rem" }}>Project {`${index + 1}`}</h1>
            <hr style={{ backgroundColor: "#047857" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <img
                src={
                  item.image
                    ? item.image.url
                    : "https://wallpapers.com/images/hd/coding-background-9izlympnd0ovmpli.jpg"
                }
                alt="Project Image Here"
                style={{
                  width: "15rem",
                  height: "auto",
                  overflow: "hidden",
                }}
              />
            </div>
            <button
              onClick={() => {
                setData({ ...data, state: index });
              }}
            >
              <b>Edit image</b>
            </button>
            <label
              for="Name"
              style={{
                fontSize: "1.1rem",
                marginRight: "100%",
                fontWeight: "bold",
              }}
            >
              Name:
            </label>

            <input
              type="text"
              className="Name"
              name="Name"
              style={{
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. The Eye "
              defaultValue={item.name ? item.name : ""}
              required={true}
            />
            <label
              for="github"
              style={{
                fontSize: "1.1rem",
                marginRight: "100%",
                fontWeight: "bold",
              }}
            >
              Github:
            </label>

            <input
              type="text"
              className="github"
              name="github"
              style={{
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. jatinxkirito"
              defaultValue={item.githubLink ? item.githubLink : ""}
            />
            <label
              for="live"
              style={{
                fontSize: "1.1rem",
                marginRight: "100%",
                fontWeight: "bold",
              }}
            >
              Link:
            </label>

            <input
              type="text"
              className="live"
              name="live"
              style={{
                width: "100%",
                backgroundColor: "white",
                borderWidth: "0.05rem",
                borderRadius: "0.5rem",
                borderColor: "black",
                padding: "0.5rem",
              }}
              placeholder="E.g. link"
              defaultValue={item.hostedLink ? item.hostedLink : ""}
            />
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
              placeholder="E.g. With help of this project you can tap into any security system of the world, that's why it is called the eye"
              defaultValue={item.description ? item.description : ""}
              required={true}
            />
            <button
              onClick={() => {
                // del.push(item.image.public_id);
                lst.splice(index, 1);
                //del.push(lst[index].image._id);
                setData({ ...data, lst });
              }}
              style={{ marginTop: "1rem" }}
            >
              <b>
                <Delete />
                Delete
              </b>
            </button>
          </div>
        );
      })}
      <button
        onClick={() => {
          setData({ ...data, lst: [...lst, {}] });
        }}
      >
        <b>
          <AddCircle /> Add Project
        </b>
      </button>
      <br />
      <Sbmt />
    </form>
  );
}
