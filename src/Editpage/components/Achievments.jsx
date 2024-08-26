import { AddCircle, Delete } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sbmt from "../../utils/SubmitBtn";

export default function AchievementForm() {
  const { name } = useParams();

  const [data, setData] = useState({ loading: true });

  //console.log("pikachu");
  useEffect(() => {
    //console.log("baby");
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/${name}/achievments`)
      .then((res) => {
        console.log(res);
        setData({ loading: false, lst: res.data.data.achievments });
      })
      .catch((error) => {
        console.log(error);
        setData({ loading: false, error });
      });
  }, []);

  if (data.loading) return <div>Loading...</div>;
  if (data.error) return <div>error</div>;
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
          console.log(df); // console.log(data.profile.picture);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Achievements</h1>
      <hr style={{ backgroundColor: "#047857" }} />
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
  );
}
