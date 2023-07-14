import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredAttrsByPrice } from "../../../rtk/features/attrSlice";
import { handlePage } from "../../../rtk/features/paginationSlice";

const PricesFilter = () => {
  const { attractions } = useSelector((state) => state);

  const dispatch = useDispatch();

  const prices = [
    { range: "0 - 500", id: 0 },
    { range: "500 - 1000", id: 1 },
    { range: "1000 - more", id: 2 },
  ];
  const [slc, setSlc] = useState("");

  const handlePriceFilter = (id) => {
    dispatch(handlePage(1));
    setSlc(id);
    dispatch(getFilteredAttrsByPrice(id));
  };

  return (
    <div>
      <FormLabel style={{ display: "none" }}>Cities</FormLabel>{" "}
      <RadioGroup>
        <div className="flex flex-wrap md:flex-col md:flex-nowrap">
          {prices.map((price) => (
            <FormControlLabel
              key={price.id}
              value={price.id}
              control={<Radio />}
              label={price.range}
              checked={!attractions.priceID ? false : slc == price.id}
              onChange={() => handlePriceFilter(price.id)}
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

export default PricesFilter;
