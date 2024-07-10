import { redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
const REDIRECT_URI = "http://localhost:5173/auth/google/callback";
export const googleAuth = () => {
  //console.log(import.meta.env.VITE_CLIENT_ID);
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_CLIENT_ID
  }&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  return url;
};
export function GoogleCallback() {
  // console.log(req);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  console.log(code);
  const { isLoading, error, data } = useQuery({
    queryKey: `userinfoData`,
    queryFn: async function () {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google/callback?code=${code}`
      );
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <div>Loading</div>;
  console.log(data);
  return <div>Loaded your data</div>;
  // Code to handle user authentication and retrieval using the profile data
  //return res.status(200).json({ data });
}
