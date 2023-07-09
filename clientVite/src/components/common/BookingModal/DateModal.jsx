import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useDispatch, useSelector } from "react-redux";
import dayjs from 'dayjs'
const DateModal = ({ CheckParkAvaliable }) => {
  const { book } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const formatDate = (e) => {
  //   const date = new Date(e.$d);
  //   const day = date.getDate();
  //   const monthIndex = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   const dateformat = `${day}-${monthIndex}-${year}`;
  //   dispatch(
  //     handleBookInfo({
  //       ...book.bookingInfo,
  //       travelDate: dateformat,
  //       dateValue: e,
  //     })
  //   );
  //   CheckParkAvaliable(dateformat, e);
  // };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        selectedSections={"day"}
        // onChange={(e) => {
        //   formatDate(e);
        // }}
        // value={book.bookingInfo.dateValue}
        reduceAnimations
        sx={{
          width: "100%",
        }}
      />
    </LocalizationProvider>
  );
};

export default DateModal;
