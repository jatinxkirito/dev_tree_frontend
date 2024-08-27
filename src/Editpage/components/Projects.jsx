import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";
import { AddCircle, Delete } from "@mui/icons-material";
import Sbmt from "../../utils/SubmitBtn";
import { CircularProgress } from "@mui/material";
import ErrorC from "../../utils/ErrorC";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NY from "../../utils/NY";

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
        setData({ loading: -1, lst: res.data.data.projects });
      })
      .catch((error) => {
        setData({ loading: -1, error });
        toast.error("Couldn't fetch data", {
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
      });
  }, []);

  if (data.loading == -2)
    return (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  if (data.error)
    return (
      <div>
        <ErrorC />
      </div>
    );
  //console.log(data);
  if (!data.lst) return <ErrorC />;
  var lst = data.lst;

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

            const df = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/api/updateProject/${name}`,
              { projects: newLst }
            );
            // window.location.reload(false);
            // setData({ ...data, state: -2 });

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
            });
            //console.log(df); // console.log(data.profile.picture);
          } catch (err) {
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
            });
          }
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Projects</h1>
        {lst.length == 0 && <NY />}
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

                        lst[index].image = df.data.data._id;
                        await axios.patch(
                          `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
                          {
                            projects: lst,
                          }
                        );
                        toast.success("Image Update Successful!", {
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
                    } catch (err) {
                      toast.error("Couldn't update Image", {
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
                onClick={(e) => {
                  e.preventDefault();
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
                maxLength="20"
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
                maxLength="400"
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
                type="button"
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
    </>
  );
}
