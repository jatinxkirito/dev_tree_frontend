import { Navigate, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label, SpaRounded } from "@mui/icons-material";
import { useCookies } from "react-cookie";
import { encryptIt } from "./crypt";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const REDIRECT_URI = "http://localhost:5173/auth/google/callback";
export const googleAuth = () => {
  //console.log(import.meta.env.VITE_CLIENT_ID);
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  return url;
};
export function GoogleCallback() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["userDevtree"]);
  const { isLoading, error, data } = useQuery({
    queryKey: `userinfoData`,
    queryFn: async function () {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback?code=${code}`
      );
      console.log(data);
      const x = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/getUser/${data.profile.email}`
      );
      console.log(x.data.status);
      if (x.data.status == "userExists") {
        // console.log(x.data.data);
        setCookie("userDevtree", encryptIt(x.data.data.username), {
          path: "/",
          expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });
        navigate(`/${x.data.data.username}`);
        return x.data;
      }

      return data;
    },
  });

  if (isLoading) return <div>Loading</div>;
  console.log(error);
  if (error || !data) return <div>error</div>;
  console.log(data);
  // if (data.status == "userExists") Navigate(`/${data.username}`);

  return (
    <>
      {" "}
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
        onSubmit={async function (e) {
          try {
            e.preventDefault();
            const dat = new FormData(e.target);
            let x = Object.fromEntries(dat);
            // console.log(data.profile.picture);
            x.picture = data.profile.picture;
            x.googleId = data.profile.id;
            console.log(x);
            const res = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/api/`,
              x
            );
            setCookie("userDevtree", encryptIt(x.username), {
              path: "/",
              expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            });
            navigate(`/${x.username}/edit`);
            toast.success("Welcome to the club!", {
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
          } catch (err) {
            var msg = "Something went wrong !";
            if (err.request.status == 500) msg = "Username already in use";
            toast.error(msg, {
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
        style={{
          color: "#10b981",
          // borderColor: "#049363",
          // borderWidth: "0.05rem",
        }}
      >
        <SpaRounded sx={{ color: "#10b981", fontSize: "5rem" }} />

        <p
          style={{
            fontFamily: "Exo 2",
            fontWeight: "bold",
            fontSize: "3rem",
            color: "#10b981",
            marginBottom: "2rem",
          }}
        >
          Let's get you started
        </p>

        <label style={{ marginRight: "0.5rem", fontWeight: "bold" }}>
          Name:<span style={{ color: "white" }}>{"......."}</span>
        </label>
        <input
          type="text"
          id="Name"
          name="name"
          style={{
            backgroundColor: "white",
            borderWidth: "0.05rem",
            borderRadius: "0.5rem",
            borderColor: "black",
            padding: "0.5rem",
          }}
          defaultValue={data.profile ? data.profile.name : ""}
          required={true}
        />
        <br />
        <br />
        <label
          for="email"
          style={{ marginRight: "0.5rem", fontWeight: "bold" }}
        >
          Email:<span style={{ color: "white" }}>{"........"}</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          style={{
            backgroundColor: "white",
            borderWidth: "0.05rem",
            borderRadius: "0.5rem",
            borderColor: "black",
            padding: "0.5rem",
          }}
          value={data.profile ? data.profile.email : null}
          required
        />
        <br />
        <br />
        <label
          for="userName"
          style={{ marginRight: "0.5rem", fontWeight: "bold" }}
        >
          Username:
        </label>
        <input
          type="text"
          id="userName"
          name="username"
          style={{
            backgroundColor: "white",
            borderWidth: "0.05rem",
            borderRadius: "0.5rem",
            borderColor: "black",
            padding: "0.5rem",
          }}
          required={true}
        />
        <br />
        <br />
        <input
          type="submit"
          value="Submit"
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.5rem",
            borderRadius: "0.5rem",
          }}
        />
      </form>
    </>
  );
  // Code to handle user authentication and retrieval using the profile data
  //return res.status(200).json({ data });
}
