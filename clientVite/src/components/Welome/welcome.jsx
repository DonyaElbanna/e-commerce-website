import React from 'react'
import Style from "./welcome.module.css";
import video from '../../assets/video/EgyVideo.mp4'
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <>
      <section className={Style.container}>
        <div className={Style.video}>
          <video src={video} type="video/mp4" autoPlay loop muted></video>
        </div>
        <div className={Style.filter}>
          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl xl:text-4xl">Our Packages</p>
          <h1 className="text-2xl xs:text3xl sm:text-4xl md:text-6xl xl:text-7xl"> Search your Holiday</h1>
            <input type="text" list="Cites" placeholder='Enter Your destination' className="w-full h-9 md:h-14 mt-4 md:mt-9  xl:mt-14 border rounded-2xl text-black" />
            <datalist id="Cites">
              <option>Cairo</option>
              <option>Alx</option>
              <option>Hurghada</option>
              <option>Luxor</option>
              <option>Sharm El-Sheikh</option>
              <option>El Gona</option>
              <option>Marsa allam</option>
              <option>Safaga</option>
              <option>Nuweiba</option>
              <option>Faiyum</option>
              <option>Siwa</option>
              <option>Sinai</option>
              <option>Dahab</option>
            </datalist>
        </div>
      </section>
    </>
  )
}

export default Welcome
