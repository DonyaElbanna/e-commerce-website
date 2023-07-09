import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  FilledInput,
  IconButton,
  Button,
  CircularProgress,
  FormHelperText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import {
  handleBookInfo,
  handleToggleBookModal,
} from "../../../rtk/features/bookingSlice";
import {
  handleErrorMessage,
  handleIsError,
  handleIsLoadingToggle,
} from "../../../rtk/features/commonSlice";

const ContactInformationModal = () => {
  const { book, common } = useSelector((state) => state);
  const [error, seterror] = useState("");
  const [FormError, SetFormError] = useState({
    email: false,
    username: false,
  });
  const dispatch = useDispatch();
  const paymentHandler = async () => {
    if (
      book.bookingInfo.email &&
      book.bookingInfo.name &&
      book.bookingInfo.contactNo
    ) {
      dispatch(handleIsLoadingToggle());
      dispatch(handleToggleBookModal());
      try {
        const response = await axios.post("/payment/transToken", {
          bookingInfo: book.bookingInfo,
        });
        const myCookie1 = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("TransToken="));
        const myCookie = response.data.TransToken
        if (myCookie) {
          // const cookieValue = myCookie.split("=")[1];
          const cookieValue = myCookie
          window.open(
            `https://secure.3gdirectpay.com/payv2.php?ID=${cookieValue}`,
            "_self"
          );
        }
      } catch (error) {
        handleIsError(true);
        handleErrorMessage(error.message || "");
      }
      dispatch(handleIsLoadingToggle());
    } else {
      seterror("Place Fill Up Form");
    }
  };
  return (
    <Box>
      <Box mt={1}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: "100%",
                height: { xs: 40, sm: 50 },
                fontSize: { xs: 12, sm: 14 },
              }}
              variant="filled"
              error={FormError.email}
            >
              <FilledInput
                id="filled-adornment-password"
                placeholder="Enter Your Email"
                type="text"
                value={book.bookingInfo.email}
                pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g"
                onBlur={(e) =>
                  SetFormError((p) => ({
                    ...p,
                    email: !e.target.value.match(
                      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
                    ),
                  }))
                }
                onChange={(e) => {
                  dispatch(
                    handleBookInfo({
                      ...book.bookingInfo,
                      email: e.target.value,
                    })
                  );
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" disabled>
                      <EmailIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {FormError.email && (
                <FormHelperText sx={{ color: "red" }}>
                  Please enter a valid email address.
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{
                width: "100%",
                height: { xs: 40, sm: 50 },
                fontSize: { xs: 12, sm: 14 },
              }}
              variant="filled"
              error={FormError.username}
            >
              <FilledInput
                id="filled-adornment-password"
                placeholder="Enter Your Name"
                type="text"
                value={book.bookingInfo.name}
                pattern="/^[a-zA-Z0-9_-]{3,100}$/"
                onBlur={(e) =>
                  SetFormError((p) => ({
                    ...p,
                    username: !e.target.value.match(/^[a-zA-Z0-9_-]{3,100}$/),
                  }))
                }
                onChange={(e) => {
                  dispatch(
                    handleBookInfo({
                      ...book.bookingInfo,
                      name: e.target.value,
                    })
                  );
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end" disabled>
                      <PersonIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
              {FormError.username && (
                <FormHelperText sx={{ color: "red" }}>
                  Username should be between 3 and 100 characters.
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} position="relative">
            <MuiTelInput
              value={book.bookingInfo.contactNo}
              defaultCountry="AE"
              
              forceCallingCode
              placeholder="Enter Your Mobile Number"
              sx={{
                width: "100%",
              }}
              onChange={(e) => {
                dispatch(
                  handleBookInfo({
                    ...book.bookingInfo,
                    contactNo: e,
                  })
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {
              <Button
                onClick={paymentHandler}
                disabled={common.isLoading}
                sx={{
                  width: "100%",
                  backgroundColor: "#0071eb",
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: { xs: 16, md: 18, lg: 20 },
                  marginTop: "10px",
                  ":hover": {
                    backgroundColor: "white",
                    color: "#0071eb",
                    border: "2px solid #0071eb",
                  },
                  ":disabled": {
                    cursor: "not-allowed !important",
                  },
                }}
              >
                {!common.isLoading ? (
                  "Pay"
                ) : (
                  <CircularProgress
                    sx={{
                      color: "white",
                      ":hover": {
                        color: "#0071eb",
                      },
                    }}
                  />
                )}
              </Button>
            }
          </Grid>
          {error && <Typography color="red">{error}</Typography>}
        </Grid>
      </Box>
    </Box>
  );
};

export default ContactInformationModal;
