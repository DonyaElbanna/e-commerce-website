import Error from "../Error/Error";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";

export const Places = () => {
  const { attractions } = useSelector((state) => state);
  const navigate = useNavigate();

  // console.log(attractions.Attractions);
  const cairoAndGiza = attractions.Attractions.filter((attr) => {
    if (attr.category._id == "6495bed4402889c27d558011") {
      return attr;
    }
  });
  const redSea = attractions.Attractions.filter((attr) => {
    if (
      attr.category._id == "6495c4e318cb8c3b3952d4d8" ||
      attr.category._id == "649605392b7e3a3538af83ef" ||
      attr.category._id == "649605652b7e3a3538af83f3" ||
      attr.category._id == "6496057e2b7e3a3538af83f5"
    ) {
      return attr;
    }
  });
  //   console.log();
  const southSina = attractions.Attractions.filter((attr) => {
    if (
      attr.category._id == "6495c61b02d893236a9248a2" ||
      attr.category._id == "649605c92b7e3a3538af83f7" ||
      attr.category._id == "64961f692b7e3a3538af8507" ||
      attr.category._id == "64988c3c8eb33848cff7e7c2"
    ) {
      return attr;
    }
  });
  const alexandria = attractions.Attractions.filter((attr) => {
    if (attr.category._id == "6495c4ac18cb8c3b3952d4d6") {
      return attr;
    }
  });
  const faiyum = attractions.Attractions.filter((attr) => {
    if (attr.category._id == "649619fa2b7e3a3538af84d3") {
      return attr;
    }
  });
  // console.log(faiyum);
  const westDesert = attractions.Attractions.filter((attr) => {
    if (attr.category._id == "64961d962b7e3a3538af84f9") {
      return attr;
    }
  });
  const luxorAndAswan = attractions.Attractions.filter((attr) => {
    if (
      attr.category._id == "6495c51318cb8c3b3952d4da" ||
      attr.category._id == "6495c49418cb8c3b3952d4d4"
    ) {
      return attr;
    }
  });

  let cities = [
    cairoAndGiza,
    redSea,
    southSina,
    alexandria,
    faiyum,
    westDesert,
    luxorAndAswan,
  ];
  // console.log(cairoAndGiza);
  let { id } = useParams();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const name = params.get("name");
  // console.log(name); //123
  // console.log(params);
  //   let id = 1;
  // switch (+id) {
  //   case 1:
  //     console.log(cairoAndGiza);
  //     break;
  //   case 2:
  //     console.log(redSea);
  //     break;
  //   case 3:
  //     console.log(southSina);
  //     break;
  //   case 4:
  //     console.log(alexandria);
  //     break;
  //   case 5:
  //     console.log(faiyum);
  //     break;
  //   case 6:
  //     console.log(westDesert);
  //     break;
  //   case 7:
  //     console.log(luxorAndAswan);
  //     break;
  //   default:
  //   // code block
  // }
  // console.log(cities.length);

  // if (id > 0 && id <= cities.length) {
  //   return (
  //     <div className="w-max">
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
  //         {cities[id - 1].map((attr) => (
  //           <AttractionCard key={attr._id} attr={attr} />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // } else {
  //   <Error />;
  //   // navigate(`/*`);
  // }
  // console.log(cities[id - 1]);

  return (
    <div>
      {id > 0 && id <= cities.length ? (
        <div>
          <div className=" bg-slate-400 rounded-xl p-5 w-max mb-20 mt-20 ml-80 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Trips in Government {name}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {cities[id - 1].map((attr) => (
              <AttractionCard key={attr._id} attr={attr} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Error />
        </div>
      )}
    </div>
  );
};
