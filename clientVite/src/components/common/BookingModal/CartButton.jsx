import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddAdult,
  handleAddChild,
  handleGrandTotal,
  handleRemoveAdult,
  handleRemoveChild,
} from "../../../rtk/features/bookingSlice";
const CartButton = ({ name, parkDetails }) => {
  const { book } = useSelector((state) => state);
  const dispatch = useDispatch();
  const AddHandler = () => {
    if (name === "Child") {
      dispatch(handleAddChild());
    } else {
      dispatch(handleAddAdult());
    }
    dispatch(handleGrandTotal(parkDetails));
  };
  const RemoveHandler = () => {
    if (name === "Child") {
      dispatch(handleRemoveChild());
    } else {
      dispatch(handleRemoveAdult());
    }
    dispatch(handleGrandTotal(parkDetails));
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={1}
    >
      <Box>
        <Typography
          textAlign="center"
          fontSize={{ xs: 14, md: 18, lg: 20 }}
          fontWeight={{ xs: 600, md: 900 }}
        >
          {name}
        </Typography>
        <Typography
          color="green"
          fontSize={{ xs: 10 }}
          sx={{
            cursor: "pointer",
          }}
        >
          important Notes
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography
          fontWeight={{ xs: 600, md: 900 }}
          fontSize={{ xs: 14, md: 18, lg: 20 }}
          marginRight={{ xs: 0.5, md: 1 }}
        >
          AED{" "}
          {name === "Child" ? parkDetails.ChildPrice : parkDetails.AdultPrice}
        </Typography>
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="delete"
            size="large"
            onClick={RemoveHandler}
            sx={{
              borderRadius: "8px",
              bgcolor: "#e3e3e3",
              width: { xs: 25, md: 30, lg: 40 },
              height: { xs: 25, md: 30, lg: 40 },
            }}
          >
            <RemoveIcon
              sx={{
                fontSize: { xs: 20, md: 25, lg: 30 },
              }}
            />
          </IconButton>
          <Typography
            fontWeight="bolder"
            bgcolor="#0071eb"
            width={{ xs: 25, md: 30, lg: 40 }}
            height={{ xs: 25, md: 30, lg: 40 }}
            marginX={0.5}
            color="white"
            borderRadius={1}
            textAlign="center"
            alignItems="center"
            display="flex"
            justifyContent="center"
          >
            <span>
              {name === "Child"
                ? book.bookingInfo.childCount
                : book.bookingInfo.adultCount}
            </span>
          </Typography>
          <IconButton
            aria-label="Add"
            size="large"
            onClick={AddHandler}
            sx={{
              borderRadius: "8px",
              bgcolor: "#e3e3e3",
              width: { xs: 25, md: 30, lg: 40 },
              height: { xs: 25, md: 30, lg: 40 },
            }}
          >
            <AddIcon
              sx={{
                fontSize: { xs: 20, md: 25, lg: 30 },
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartButton;
