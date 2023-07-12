import React from "react";
import "./Map.css";

const Map = () => {
  return (
    <div style={{ position: "relative" }}>
      <div className="map">
        <img
          src="https://www.youregypttours.com/images/mapz.webp"
          alt="Attractions Map"
          title="Attractions Map"
        />
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/alexandria-day-tours"
          className="alex small-img"
        >
          <h3 className="title">alex</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/alex.webp"
            alt="Alxandria Egypt"
            title="Alxandria Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/aswan-day-tours"
          className="aswan small-img"
        >
          <h3 className="title">aswan</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/aswan.webp"
            alt="Aswan Egypt"
            title="Aswan Egypt"
          />
        </a>
        <a
          href="http://localhost:5173/city/6495bed4402889c27d558011"
          className="cairo small-img"
        >
          <h3 className="title">cairo</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/cairo.webp"
            alt="Cairo Egypt"
            title="Cairo Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/giza-day-tours"
          className="giza small-img"
        >
          <h3 className="title">giza</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/giza.webp"
            alt="Giza Egypt"
            title="Giza Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/luxor-day-tours"
          className="luxor small-img"
        >
          <h3 className="title">luxor</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/luxor.webp"
            alt="Luxor Egypt"
            title="Luxor Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/hurghada-day-tours"
          className="redsea small-img"
        >
          <h3 className="title">hurgh</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/red-sea.webp"
            alt="Hurghada Egypt"
            title="Hurghada Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/sharm-el-sheikh-day-tours"
          className="sharm small-img"
        >
          <h3 className="title">sharm</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/sharm.webp"
            alt="Sharm el Sheikh Egypt"
            title="Sharm el Sheikh Egypt"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/western-desert-day-tours"
          className="desert small-img"
        >
          <h3 className="title">desert</h3>
          <img
            src="https://www.youregypttours.com/images/homepage/wight-desert.webp"
            alt="Egypt desert safari"
            title="Egypt desert safari"
          />
        </a>
        <a
          href="https://www.youregypttours.com/what-to-do/egypt-day-tours/alexandria-day-tours"
          className="dahab small-img"
        >
          <h3 className="title">Dahab</h3>
          <img
            src="http://res.cloudinary.com/drntnt5uf/image/upload/v1687718972/Images/jywpovtj2rov5pnwkhyr.jpg"
            alt="Alxandria Egypt"
            title="Alxandria Egypt"
            className="mask mask-circle "
          />
        </a>
      </div>
    </div>
  );
};

export default Map;
