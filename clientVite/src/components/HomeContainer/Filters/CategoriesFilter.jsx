import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFilters,
  getFilteredAttrsByCat,
} from "../../../rtk/features/attrSlice";

const CategoriesFilter = () => {
  const dispatch = useDispatch();

  const { categories, attractions } = useSelector((state) => state);
  const [slc, setSlc] = useState("");

  // console.log(cities.cities);

  const handleCatFilter = (catID) => {
    setSlc(catID);
    dispatch(handleFilters({ category: true }));
    dispatch(getFilteredAttrsByCat(catID));
  };

  return (
    <div>
      <FormLabel style={{ display: "none" }}>Cities</FormLabel>{" "}
      <RadioGroup>
        <div>
          {categories.categories.map((cat) => (
            <FormControlLabel
              key={cat._id}
              value={cat._id}
              control={<Radio />}
              label={cat.type}
              checked={!attractions.filters ? false : slc == cat._id}
              onChange={() => handleCatFilter(cat._id)}
              sx={{
                ".css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked ": {
                  color: "#be853f",
                },
              }}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default CategoriesFilter;
