import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredAttrsByCity,
  handleFilters,
} from "../../../rtk/features/attrSlice";

const CityFilter = () => {
  const dispatch = useDispatch();

  const { cities, attractions } = useSelector((state) => state);
  const [slc, setSlc] = useState("");

  const handleCityFilter = (cityID) => {
    setSlc(cityID);
    dispatch(handleFilters({ city: true }));
    dispatch(getFilteredAttrsByCity(cityID));
  };

  return (
    <div>
      <FormLabel style={{ display: "none" }}>Cities</FormLabel>
      <RadioGroup
        sx={{
          maxHeight: 300,
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            background: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ffae73",
            outline: "1px solid #be853f",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#be853f",
          },
        }}
      >
        <div className="flex flex-wrap md:flex-col md:flex-nowrap">
          {cities.cities.map((city) => (
            <FormControlLabel
              key={city._id}
              value={city._id}
              control={<Radio />}
              label={city.city}
              checked={!attractions.filters ? false : slc == city._id}
              onChange={() => handleCityFilter(city._id)}
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

export default CityFilter;
