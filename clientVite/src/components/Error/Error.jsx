import React from "react";
import Style from "./Error.module.css";
import backgroundImg from "../../assets/5.jpg";
const Error = () => {
  return (
    <>
      {/* <section className="bg-black">
        <figure className="max-w-3xl m-auto">
          <img
            src={backgroundImg}
            alt=""
            className="rounded-full"
            style={{ filter: "opacity(.2)" }}
          />
        </figure>
      </section> */}

      <section className="py-10">
        <main
          id="backgroundImg"
          className="h-screen text-center text-stone-700 flex flex-col justify-center items-center"
        >
          <h3 className="text-5xl mb-16">ERROR!</h3>
          <h1 className="text-9xl mb-16">404</h1>
          <h3 className="text-5xl ">PAGE NOT FOUND</h3>
        </main>
      </section>
    </>
  );
};

export default Error;
