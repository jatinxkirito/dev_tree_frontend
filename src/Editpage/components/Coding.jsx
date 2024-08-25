import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CodingForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/cp`)
      .then((res) => {
        console.log(res);
        setData({ loading: false, lst: res.data.data });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false, error });
      });
  }, []);

  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>Loading...</div>;
  //console.log(data);
  var lst = data.lst;
  //console.log(data);
  //var lst = data.data.education;

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={async function (e) {
        try {
          e.preventDefault();
          const dat = new FormData(e.target);
          let x = Object.fromEntries(dat);
          if (x.codeforces == "") x.codeforces = undefined;
          if (x.codechef == "") x.codechef = undefined;
          if (x.leetcode == "") x.leetcode = undefined;
          const df = await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/${name}`,
            x
          );

          console.log(df); // console.log(data.profile.picture);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: "2rem" }}>Coding Handles</h1>
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
      <input type="submit" value="Submit" />
    </form>
  );
}
