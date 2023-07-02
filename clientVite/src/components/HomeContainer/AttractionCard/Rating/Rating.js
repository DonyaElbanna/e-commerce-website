import React, { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleToggleAuthModal } from "../../../../rtk/features/authSlice";
import { useParams } from "react-router-dom";
import { handleErrorMessage, handleIsError } from "../../../../rtk/features/commonSlice";
const RatingComponent = ({ rating }) => {
  const [value, setValue] = useState(0);
  const [RatingValue, setReting] = useState([]);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { id } = useParams();
  useEffect(() => {
    calcrating(rating);
    setReting(rating);
  }, [rating]);
  const ratingHandler = async (e) => {

    if (auth.isLoggedIn) {
      try {
        const res = await axios.post(`attraction/updateRating/${id}`, {
          userId: auth.loggedInInfo._id,
          value: e.target.value,
        });
        setReting(res.data.message);
        calcrating(res.data.message);
      } catch (error) {
        dispatch(handleIsError(true))
        dispatch(handleErrorMessage(error.message))
      }
    } else {
      dispatch(handleToggleAuthModal());
    }
  };
  const calcrating = (rating) => {
    let sum = 0;
    for (let i = 0; i < rating.length; i++) {
      sum += rating[i].value;
    }
    setValue(Number((sum / (rating.length || 1)).toFixed(2)));
  };
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        zIndex: 1000,
      }}
    >
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Rating
          precision={0.1}
          name="half-rating"
          sx={{
            fontSize: {
              xs: 16,
              md: 20,
              lg: 25,
            },
          }}
          value={value}
          onChange={(event, newValue) => {
            ratingHandler(event);
          }}
        />
        <Typography
          fontSize={{ xs: 12, sm: 14, md: 18, lg: 20 }}
          fontWeight={{ xs: 700, md: "bolder" }}
          p={{ xs: 0.5, md: 1 }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          fontSize={{ xs: 8, md: 11 }}
          fontWeight={{ xs: 700, md: "bold" }}
        >
          ({`${RatingValue.length}`} reviews)
        </Typography>
      </Box>
    </Box>
  );
};
export default RatingComponent;
