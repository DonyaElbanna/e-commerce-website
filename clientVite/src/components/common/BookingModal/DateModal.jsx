import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs'
import { handleBookInfo } from "../../../rtk/features/bookingSlice";
const DateModal = ( ) => {
  const { book } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(book.bookingInfo)
  const formatDate = (e) => {
    const date = new Date(e.$d);
    dispatch(
      handleBookInfo({
        ...book.bookingInfo,
        travelDate: date,
        dateValue: e,
      })
    );
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        selectedSections={"day"}
        onChange={(e) => {
          formatDate(e);
        }}
        value={book.bookingInfo.dateValue}
        reduceAnimations
        sx={{
          width: "100%",
        }}
      />
    </LocalizationProvider>
  );
};

export default DateModal;
