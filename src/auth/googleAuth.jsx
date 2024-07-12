import { Navigate, redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@mui/icons-material";
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
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <label style={{ marginRight: "0.5rem" }}>Name</label>
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
      <label for="email" style={{ marginRight: "0.5rem" }}>
        Email
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
      <label for="userName" style={{ marginRight: "0.5rem" }}>
        Username
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
      <input type="submit" value="Submit" />
    </form>
  );
  // Code to handle user authentication and retrieval using the profile data
  //return res.status(200).json({ data });
}
