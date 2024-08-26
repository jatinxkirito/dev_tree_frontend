import { AddCircle, Delete } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sbmt from "../../utils/SubmitBtn";
import { CircularProgress } from "@mui/material";
import ErrorC from "../../utils/ErrorC";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NY from "../../utils/NY";

export default function EducationForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/education`)
      .then((res) => {
        setData({ loading: false, lst: res.data.data.education });
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
            e.preventDefault();
            const Degree = document.querySelectorAll(".Degree");
            const Institute = document.querySelectorAll(".Institute");
            const From = document.querySelectorAll(".From");
            const To = document.querySelectorAll(".To");
            const Grade = document.querySelectorAll(".Grade");
            const Location = document.querySelectorAll(".Location");
            var newLst = [];
            console.log(Degree.length);
            for (let i = 0; i < Degree.length; i++) {
              newLst.push({
                startDate: From[i].value,
                endDate: To[i].value,
                institutionName: Institute[i].value,
                degreeName: Degree[i].value,
                grade: Grade[i].value,
                location: Location[i].value,
              });
            }

            const df = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
              { education: newLst }
            );
            //window.location.reload(false);
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
            }); // console.log(data.profile.picture);
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
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Education</h1>
        <hr style={{ backgroundColor: "#047857" }} />
        {lst.length == 0 && <NY />}
        {lst.map((item, index) => {
          return (
            <div key={index} style={{ marginBottom: "1rem" }}>
              <h1 style={{ fontSize: "2rem" }}>Education {`${index + 1}`}</h1>
              <hr style={{ backgroundColor: "#047857" }} />
              <label
                for="Degree"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Degree:
              </label>

              <input
                type="text"
                className="Degree"
                name="Degree"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. BTECH Computer Science and Engineering"
                defaultValue={item.degreeName ? item.degreeName : ""}
                required={true}
              />
              <label
                for="Institute"
                style={{
                  fontSize: "1.1rem",
                  marginRight: "100%",
                  fontWeight: "bold",
                }}
              >
                Institute:
              </label>

              <input
                type="text"
                className="Institute"
                name="Institute"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. ABC Engineering College"
                defaultValue={item.institutionName ? item.institutionName : ""}
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
                  From:<span style={{ color: "white" }}>..</span>
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
                  placeholder="E.g. 2021"
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
                  placeholder="E.g. 2025"
                  defaultValue={item.endDate ? item.endDate : ""}
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
                  for="Grade"
                  style={{ fontSize: "1.1rem", fontWeight: "bold" }}
                >
                  Grade:
                </label>
                <input
                  type="text"
                  className="Grade"
                  name="Grade"
                  style={{
                    marginLeft: "0.5rem",
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: "0.05rem",
                    borderRadius: "0.5rem",
                    borderColor: "black",
                    padding: "0.5rem",
                  }}
                  placeholder="E.g. Gpa:9 or 90%"
                  defaultValue={item.grade ? item.grade : ""}
                  required={true}
                />
                <label
                  for="Location"
                  style={{
                    fontSize: "1.1rem",
                    marginLeft: "0.5rem",
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
                    marginLeft: "0.5rem",
                    width: "100%",
                    backgroundColor: "white",
                    borderWidth: "0.05rem",
                    borderRadius: "0.5rem",
                    borderColor: "black",
                    padding: "0.5rem",
                  }}
                  placeholder="E.g. Delhi, India"
                  defaultValue={item.location ? item.location : ""}
                  required={true}
                />
              </div>
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
            <AddCircle /> Add Education
          </b>
        </button>
        <br />
        <Sbmt />
      </form>
    </>
  );
}
