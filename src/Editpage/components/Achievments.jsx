import { AddCircle, Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sbmt from "../../utils/SubmitBtn";
import { CircularProgress } from "@mui/material";
import ErrorC from "../../utils/ErrorC";
import { Bounce, toast, ToastContainer } from "react-toastify";
import NY from "../../utils/NY";

export default function AchievementForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/achievments`)
      .then((res) => {
        setData({ loading: false, lst: res.data.data.achievments });
      })
      .catch((error) => {
        setData({ loading: false, error });
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
            setData({ ...data, loading: true });
            const Achievements = document.querySelectorAll(".Achievment");

            var newLst = [];
            //console.log(Company.length);
            for (let i of Achievements) {
              newLst.push(i.value);
            }

            const df = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
              { achievments: newLst }
            );
            //  window.location.reload(false);
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
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Achievments</h1>
        <hr style={{ backgroundColor: "#047857" }} />
        {lst.length == 0 && <NY />}
        {lst.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                margin: "1rem",
              }}
            >
              <input
                type="text"
                className="Achievment"
                name="Achievment"
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  borderWidth: "0.05rem",
                  borderRadius: "0.5rem",
                  borderColor: "black",
                  padding: "0.5rem",
                }}
                placeholder="E.g. Won xyz hackathon"
                defaultValue={item ? item : ""}
                required={true}
              />
              <button
                onClick={() => {
                  lst.splice(index, 1);
                  setData({ ...data, lst });
                }}
                style={{
                  marginTop: "auto",
                  marginBottom: "0.8rem",
                  fontSize: "1.1rem",
                }}
              >
                <Delete />
              </button>
            </div>
          );
        })}
        <button
          onClick={() => {
            setData({ ...data, lst: [...lst, ""] });
          }}
        >
          <b>
            <AddCircle /> Add Achievement
          </b>
        </button>
        <br />
        <Sbmt />
      </form>
    </>
  );
}
