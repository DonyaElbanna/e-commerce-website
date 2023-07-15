import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import {
  Grid,
  FilledInput,
  Typography,
  Box,
  Button,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { handlerResetBooking } from "../../../rtk/features/bookingSlice";
const CreditCard = () => {
  const { book,parkGroup} = useSelector((state) => state);
  const dispatch = useDispatch()
  const [value, setvalue] = useState({
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "number") {
      if (value.match("^[0-9]*$") && value.length <= 16) {
        setErrorMessage((prev) => ({ ...prev, number: "" }));
        setvalue((prev) => ({ ...prev, [name]: value }));
      }
      if (!value.match("^[0-9]*$") && !(value.length > 16)) {
        setErrorMessage((prev) => ({
          ...prev,
          number: "type input value should be number",
        }));
      }
    } else if (name === "cvc") {
      if (value.match("^[0-9]*$") && value.length <= 4) {
        setErrorMessage((prev) => ({ ...prev, cvc: "" }));
        setvalue((prev) => ({ ...prev, [name]: value }));
      }
      if (!value.match("^[0-9]*$") && value.length !== 5) {
        setErrorMessage((prev) => ({
          ...prev,
          cvc: "cvc value should be number",
        }));
      }
    } else if (name === "name") {
      if (value.match("^[a-zA-Z_ ]*$")) {
        setErrorMessage((prev) => ({ ...prev, name: "" }));
        setvalue((prev) => ({ ...prev, [name]: value }));
      } else {
        setErrorMessage((prev) => ({
          ...prev,
          name: "name value should be string ",
        }));
      }
    } else if (name === "expiry") {
      if (value.match("^[0-9]*$") && value.length <= 4) {
        setErrorMessage((prev) => ({ ...prev, expiry: "" }));
        setvalue((prev) => ({ ...prev, [name]: value }));
      }
      if (!value.match("^[0-9]*$") && value.length !== 5) {
        setErrorMessage((prev) => ({
          ...prev,
          expiry: "MM/YY value should be number",
        }));
      }
    }
  };

  const handleInputFocus = (evt) => {
    setvalue((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const bookingHandler = async () => {
    try {
      const order = await axios.post("http://localhost:9999/order",{
        attrID: parkGroup.parkDetails._id,
        adults: book.bookingInfo.adultCount,
        children: book.bookingInfo.childCount,
        expectedDate: book.bookingInfo.travelDate,
        email:book.bookingInfo.email
      })
      dispatch(handlerResetBooking())
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Box width="100%">
      <Cards
        cvc={value.cvc}
        expiry={value.expiry}
        focused={value.focus}
        name={value.name}
        number={value.number}
      />
      <Box
        sx={{
          marginY: "10px",
          width: "100%",
          gap: "10px",
        }}
      >

        <Box display="flex" flexDirection="column">
      <FormControl>
          <FilledInput
            type="tel"
            sx={{
              px:"5px"
            }}
            name="number"
            className="form-control"
            placeholder="Card Number   (E.g.: 49..., 51..., 36..., 37...)"
            pattern="[\d| ]{16,22}"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fullWidth
            value={value.number}
          />
      </FormControl>
          <Typography
            sx={{
              color: "red",
              fontSize: { xs: 10, md: 14 },
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {errorMessage.number}
          </Typography>
        </Box>
        <Box display="flex"  flexDirection="column">
      <FormControl>
          <FilledInput
            sx={{
              px:"5px"
            }}
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            required
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            fullWidth
            value={value.name}
          />
      </FormControl>
          <Typography
            sx={{
              color: "red",
              fontSize: { xs: 10, md: 14 },
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {errorMessage.name}
          </Typography>
        </Box>
        <Grid container spacing={1}>
          <Grid item xs={6}>
          <FormControl>
            <FilledInput
              type="tel"
              sx={{
                px:"5px"
            }}
              name="expiry"
              className="form-control"
              placeholder="MM/YY"
              pattern="\d\d/\d\d"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={value.expiry}
              fullWidth
            />
          </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl>
            <FilledInput
                        sx={{
              px:"5px"
            }}
              type="tel"
              name="cvc"
              className="form-control"
              placeholder="CVC"
              pattern="\d{3,4}"
              maxLength={4}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              value={value.cvc}
              fullWidth
            />
          </FormControl>
          </Grid>
          <Typography
            sx={{
              color: "red",
              fontSize: { xs: 10, md: 14 },
              fontWeight: "600",
              textAlign: "center",
              width: "100%",
            }}
          >
            {errorMessage.cvc || errorMessage.expiry}
          </Typography>
        </Grid>
        <Button
          onClick={bookingHandler}
          sx={{
            width: "100%",
            backgroundColor: "#e69e22",
            color: "white",
            fontWeight: "bolder",
            fontSize: { xs: 16, md: 18, lg: 20 },
            marginTop: "10px",
            ":hover": {
              backgroundColor: "white",
              color: "#e69e22",
              border: "2px solid #e69e22",
            },
          }}
        >
          Pay
        </Button>
      </Box>
    </Box>
  );
};

export default CreditCard;
