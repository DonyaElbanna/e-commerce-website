import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Categories from "../Categories/Categories";
import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";
import gif from "../../assets/gih.gif";

const AttractionsList = () => {
  let { id } = useParams();

  const { cities, categories, attractions } = useSelector((state) => state);
  const [filteredAttrs, setFilteredAttrs] = useState([]);

  const city = cities.cities.find((city) => city._id == id);

  const cityAttrs = attractions.Attractions.filter(
    (attr) => attr.category._id == city._id
  );

  const cityCats = categories.categories.filter((category) =>
    cityAttrs.some((attraction) => attraction.subcategory._id === category._id)
  );

  const handleFilter = (catID) => {
    const filteredattrs = cityAttrs.filter(
      (attr) => attr.subcategory._id == catID
    );
    setFilteredAttrs(filteredattrs);
  };

  const resetFilters = () => {
    setFilteredAttrs(cityAttrs);
  };

  return (
    <>
      {cityAttrs.length == 0 || cityCats.length == 0 ? (
        <img src={gif} className=" mx-auto" style={{ width: "150px" }} />
      ) : (
        <div className="container p-5 mx-auto">
          <h3 className="text-4xl text-center text-zinc-700 headerFont">
            {city.city}
          </h3>
          <Categories
            cityCats={cityCats}
            handleFilter={handleFilter}
            resetFilters={resetFilters}
          />
          <h3 className="text-4xl mb-8 text-center text-[#be853f] font-medium">
            Tours
          </h3>
          <div className="container px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredAttrs.length == 0
              ? cityAttrs.map((attr) => (
                  <AttractionCard key={attr._id} attr={attr} />
                ))
              : filteredAttrs.map((attr) => (
                  <AttractionCard key={attr._id} attr={attr} />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AttractionsList;

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Categories from "../Categories/Categories";
// import AttractionCard from "../HomeContainer/AttractionCard/AttractionCard";
// import gif from "../../assets/gih.gif";

// const AttractionsList = () => {
//   let { id } = useParams();

//   const { cities, categories, attractions } = useSelector((state) => state);
//   // console.log(cities.cities, categories.categories, attractions.Attractions);

//   const [filteredAttrs, setFilteredAttrs] = useState([]);

//   const city = cities.cities.find((city) => city._id == id);

//   const cityAttrs = attractions.Attractions.filter(
//     (attr) => attr.category._id == city._id
//   );

//   const cityCats = categories.categories.filter((category) =>
//     cityAttrs.some((attraction) => attraction.subcategory._id === category._id)
//   );

//   const handleFilter = (catID) => {
//     const filteredattrs = cityAttrs.filter(
//       (attr) => attr.subcategory._id == catID
//     );
//     setFilteredAttrs(filteredattrs);
//   };

//   const resetFilters = () => {
//     setFilteredAttrs(cityAttrs);
//   };

//   return (
//     <>
//       {cityAttrs.length == 0 || cityCats.length == 0 ? (
//         <img src={gif} className=" mx-auto" style={{ width: "150px" }} />
//       ) : (
//         <div className="container p-5 mx-auto">
//           <h3 className="text-3xl text-center">{city.city}</h3>
//           <Categories
//             cityCats={cityCats}
//             handleFilter={handleFilter}
//             resetFilters={resetFilters}
//           />
//           <h3 className="text-3xl mb-8 text-center">Tours</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
//             {filteredAttrs.length == 0
//               ? cityAttrs.map((attr) => (
//                   <AttractionCard key={attr._id} attr={attr} />
//                 ))
//               : filteredAttrs.map((attr) => (
//                   <AttractionCard key={attr._id} attr={attr} />
//                 ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AttractionsList;
