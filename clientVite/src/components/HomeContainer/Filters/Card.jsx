import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../../rtk/features/authSlice";
import { highestAttrsHandler } from "../../../rtk/features/attrSlice";
import Rating from "@mui/material/Rating";

const CardItem = ({ attr }) => {
  const { attractions, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (auth.userInfo._id) {
      const getWishlistItems = async () => {
        const { data } = await axios.get(
          `http://localhost:9999/user/${auth.userInfo._id}`
        );
        setWishlistItems(data.wishlist);
      };
      getWishlistItems();
    }
  }, []);

  const handleAddToWishlist = async (e, attr) => {
    e.preventDefault();
    if (wishlistItems.some((item) => item._id === attr._id)) {
      const newWishlist = wishlistItems.filter((item) => item._id !== attr._id);
      setWishlistItems(newWishlist);
    } else {
      const newWishlist = wishlistItems.concat(attr);
      setWishlistItems(newWishlist);
    }
    try {
      await axios.post(`http://localhost:9999/user/${auth.userInfo._id}`, {
        id: auth.userInfo._id,
        Attraction: attr._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function redirectToLogin(event) {
    event.preventDefault();
    dispatch(handleAuthType("login"));
    dispatch(handleToggleAuthModal());
  }

  return (
    <Link
      to={`/city/${attr._id}/details`}
    >
      <Card>
        <CardMedia sx={{ height: 140 }} image={attr.Images[0]} alt=" image" />
        <p className="text-slate-500 text-right" style={{ marginRight: "3px" }}>
          {attr.category.city || attr.category[0].city}
        </p>
        <CardContent sx={{ padding: "0px", paddingBottom: "0px !important" }}>
          <Typography variant="h5" component="div" sx={{ padding: "0px 10px" }}>
            {attr.name}
          </Typography>
          <Typography variant="body1" color="text.info" component="span">
            <div className="flex items-center justify-between pl-2">
              <Rating value={attr.averageRating} precision={0.5} readOnly />
              <button
                className="btn btn-ghost btn-circle"
                onClick={
                  auth.isLoggedIn
                    ? (e) => handleAddToWishlist(e, attr)
                    : redirectToLogin
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={
                    wishlistItems.some((item) => item._id == attr._id)
                      ? "#FF0000"
                      : "none"
                  }
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#DC143C"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-slate-300 pl-2 flex items-center justify-between transition">
              <p>${attr.AdultPrice} /adult</p>
              <p className="p-2 hover:bg-slate-400">Details</p>
            </div>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CardItem;
