import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PropTypes from "prop-types";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFilters,
  getFilteredAttrsByPrice,
} from "../../../rtk/features/attrSlice";

const CityFilter = () => {
  const { attractions } = useSelector((state) => state);

  const dispatch = useDispatch();

  const prices = [
    { range: "0 - 500", id: 0 },
    { range: "500 - 1000", id: 1 },
    { range: "1000 - more", id: 2 },
  ];
  const [slc, setSlc] = useState("");

  const handlePriceFilter = (id) => {
    setSlc(id);
    dispatch(handleFilters({ prices: true }));
    dispatch(getFilteredAttrsByPrice(id));
  };

  return (
    <div>
      <FormLabel style={{ display: "none" }}>Cities</FormLabel>{" "}
      <RadioGroup>
        <div className="filter-btns">
          {prices.map((price) => (
            <FormControlLabel
              key={price.id}
              value={price.id}
              control={<Radio />}
              label={price.range}
              checked={!attractions.filters ? false : slc == price.id}
              onChange={() => handlePriceFilter(price.id)}
            />
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default CityFilter;
