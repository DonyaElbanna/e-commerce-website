import React, { useEffect, useState } from "react";
import Style from "./welcome.module.css";
import video from "../../../assets/video/EgyVideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Welcome() {
  const [cats, setCats] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getCats = async () => {
      const { data } = await axios.get("http://localhost:9999/category");
      // console.log(data);
      setCats(data.categories);
    };
    getCats();
  }, []);

  const handleNavigate = (tar) => {
    Navigate(`/city/${tar}`);
  };
  return (
    <>
      <section className={Style.container}>
        <div className={Style.video}>
          <video src={video} type="video/mp4" autoPlay loop muted></video>
        </div>
        <div className={Style.filter}>
          <p className="text-lg xs:text-xl sm:text-xl md:text-2xl xl:text-3xl">
            Our Packages
          </p>
          <h1 className="text-2xl xs:text2xl sm:text-3xl md:text-5xl xl:text-6xl">
            {" "}
            Search your Holiday
          </h1>

          <select
            id="Cites"
            onChange={(e) => handleNavigate(e.target.value)}
            className="w-full h-9 md:h-14 mt-4 md:mt-9  xl:mt-14 border rounded-2xl text-black"
          >
            <option>Choose a city</option>
            {cats.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.city}
              </option>
            ))}
          </select>
        </div>
      </section>
    </>
  );
}

export default Welcome;
