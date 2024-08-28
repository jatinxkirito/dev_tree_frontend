import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sbmt from "../../utils/SubmitBtn";
import { CircularProgress } from "@mui/material";
import ErrorC from "../../utils/ErrorC";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function CodingForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/cp`)
      .then((res) => {
        setData({ loading: false, lst: res.data.data });
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
            const dat = new FormData(e.target);
            let x = Object.fromEntries(dat);
            if (x.codeforces == "") x.codeforces = undefined;
            if (x.codechef == "") x.codechef = undefined;
            if (x.leetcode == "") x.leetcode = undefined;
            const df = await axios.patch(
              `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
              x
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
        <div style={{ marginBottom: "1rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
            Coding Handles
          </h1>
          <hr style={{ backgroundColor: "#047857" }} />
          <label
            for="leetcode"
            style={{
              fontSize: "1.1rem",
              marginRight: "100%",
              fontWeight: "bold",
            }}
          >
            LeetCode:
          </label>

          <input
            type="text"
            id="leetcode"
            name="leetcode"
            style={{
              width: "100%",
              backgroundColor: "white",
              borderWidth: "0.05rem",
              borderRadius: "0.5rem",
              borderColor: "black",
              padding: "0.5rem",
            }}
            placeholder="E.g. jatinxkirito"
            defaultValue={lst.leetcode ? lst.leetcode : ""}
          />
          <label
            for="codeforces"
            style={{
              fontSize: "1.1rem",
              marginRight: "100%",
              fontWeight: "bold",
            }}
          >
            Codeforces:
          </label>

          <input
            type="text"
            className="Codeforces"
            name="codeforces"
            style={{
              width: "100%",
              backgroundColor: "white",
              borderWidth: "0.05rem",
              borderRadius: "0.5rem",
              borderColor: "black",
              padding: "0.5rem",
            }}
            placeholder="E.g. jatinxkirito"
            defaultValue={lst.codeforces ? lst.codeforces : ""}
          />
          <label
            for="Codechef"
            style={{
              fontSize: "1.1rem",
              marginRight: "100%",
              fontWeight: "bold",
            }}
          >
            Codechef:
          </label>

          <input
            type="text"
            className="Codechef"
            name="codechef"
            style={{
              width: "100%",
              backgroundColor: "white",
              borderWidth: "0.05rem",
              borderRadius: "0.5rem",
              borderColor: "black",
              padding: "0.5rem",
            }}
            placeholder="E.g. jatinxkirito"
            defaultValue={lst.codechef ? lst.codechef : ""}
          />
        </div>

        <br />
        <Sbmt />
      </form>
    </>
  );
}
