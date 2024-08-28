import { AddCircle, Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sbmt from "../../utils/SubmitBtn";
import { CircularProgress } from "@mui/material";
import ErrorC from "../../utils/ErrorC";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NY from "../../utils/NY";

export default function ExperienceForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/experience`)
      .then((res) => {
        setData({ loading: false, lst: res.data.data.work });
      })
      .catch((error) => {
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
        setData({ loading: false, error });
      });
  }, []);

  if (data.loading)
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
  //console.log(data);
  //var lst = data.data.education;

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
            setData({ ...data, loading: true });
            e.preventDefault();
            const Company = document.querySelectorAll(".Company");
            const Job = document.querySelectorAll(".Job");
            const From = document.querySelectorAll(".From");
            const To = document.querySelectorAll(".To");
            const Tech = document.querySelectorAll(".Tech");
            const Experience = document.querySelectorAll(".Experience");
            const Location = document.querySelectorAll(".Location");
            var newLst = [];

            for (let i = 0; i < Company.length; i++) {
              newLst.push({
                startDate: From[i].value,
                endDate: To[i].value,
                company: Company[i].value,
                jobTitle: Job[i].value,
                skills: Tech[i].value,
                description: Experience[i].value,
                location: Location[i].value,
              });
            }

            const df = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
              { work: newLst }
            );
            // window.location.reload(false);
            setData({ ...data, loading: false });
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
            setData({ ...data, loading: false });
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
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Experience</h1>
        {lst.length == 0 && <NY />}
        {lst.map((item, index) => {
          return (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <h1 style={{ fontSize: "2rem" }}>Experience {`${index + 1}`}</h1>
              <hr style={{ backgroundColor: "#047857" }} />
              <label
                for="Company"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Company:
              </label>

              <input
                type="text"
                className="Company"
                name="Company"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. Google India"
                defaultValue={item.company ? item.company : ""}
                required={true}
              />
              <label
                for="Job"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Job:
              </label>

              <input
                type="text"
                className="Job"
                name="Job"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. SDE I"
                defaultValue={item.jobTitle ? item.jobTitle : ""}
                required={true}
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  direction: "row",
                  marginTop: "0.8rem",
                }}
              >
                <label
                  for="From"
                  style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  From:
                </label>
                <input
                  type="text"
                  className="From"
                  name="From"
                  style={{
                    marginLeft: "0.5rem",
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: "0.05rem",
                    borderRadius: "0.5rem",
                    borderColor: "black",
                    padding: "0.5rem",
                  }}
                  placeholder="E.g. Dec 2021"
                  defaultValue={item.startDate ? item.startDate : ""}
                  required={true}
                />
                <label
                  for="To"
                  style={{
                    fontSize: "1.1rem",
                    marginLeft: "4rem",
                    fontWeight: "bold",
                  }}
                >
                  To:
                </label>
                <input
                  type="text"
                  className="To"
                  name="To"
                  style={{
                    marginLeft: "0.5rem",
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: "0.05rem",
                    borderRadius: "0.5rem",
                    borderColor: "black",
                    padding: "0.5rem",
                  }}
                  placeholder="E.g. Present"
                  defaultValue={item.endDate ? item.endDate : ""}
                  required={true}
                />
              </div>
              <label
                for="Location"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Location:
              </label>

              <input
                type="text"
                className="Location"
                name="Location"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. Remote"
                defaultValue={item.location ? item.location : ""}
                required={true}
              />
              <label
                for="Tech"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                TechStack:
              </label>

              <textarea
                type="text"
                className="Tech"
                name="Tech"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. HTML,CSS,Javascript,React,Nodejs"
                defaultValue={item.skills ? item.skills : ""}
                required={true}
              />
              <label
                for="Experience"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Experience:
              </label>

              <textarea
                type="text"
                className="Experience"
                name="Experience"
                rows="5"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. Created a dynamic website that increased user retetion by 25%"
                defaultValue={item.description ? item.description : ""}
                required={true}
              />

              <button
                onClick={() => {
                  lst.splice(index, 1);
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
            <AddCircle /> Add Experience
          </b>
        </button>
        <br />
        <Sbmt />
      </form>
    </>
  );
}
