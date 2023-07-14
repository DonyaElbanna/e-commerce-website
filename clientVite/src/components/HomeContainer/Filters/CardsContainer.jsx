// import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Unstable_Grid2";
import CardItem from "./Card";
import SentimentVeryDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentVeryDissatisfiedOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import { handlePage } from "../../../rtk/features/paginationSlice";
import Pagination from "@mui/material/Pagination";

const CardsContainer = () => {
  const dispatch = useDispatch();

  const { attractions, pagination } = useSelector((state) => state);
  console.log(attractions);

  const count =
    !attractions.cityID && !attractions.catID && !attractions.priceID
      ? Math.ceil(attractions.highestRated.slice(6).length / 3)
      : Math.ceil(attractions.filteredAttrs.length / 3);

  const handlePages = (e, value) => {
    dispatch(handlePage(value));
  };

  function paginate(arr, size) {
    return arr.reduce((acc, val, i) => {
      let idx = Math.floor(i / size);
      let page = acc[idx] || (acc[idx] = []);
      page.push(val);

      return acc;
    }, []);
  }

  return (
    <>
      <Grid container spacing={3}>
        {!attractions.cityID && !attractions.catID && !attractions.priceID ? (
          paginate(attractions.highestRated.slice(6).reverse(), 3)[
            pagination.page - 1
          ].map((attr) => (
            <Grid xs={12} md={6} lg={4} key={attr._id}>
              <CardItem attr={attr} />
            </Grid>
          ))
        ) : attractions.filteredAttrs.length !== 0 ? (
          paginate(attractions.filteredAttrs, 3)[pagination.page - 1].map(
            (attr) => (
              <Grid xs={12} md={6} lg={4} key={attr._id}>
                <CardItem attr={attr} />
              </Grid>
            )
          )
        ) : (
          <div className="flex flex-col text-xl text-zinc-700 text-center mx-auto py-36 gap-5">
            <p>
              Out of luck!{" "}
              <SentimentVeryDissatisfiedOutlinedIcon
                sx={{ fontSize: "30px" }}
              />
            </p>
            <p>
              We're always adding more tours, check again soon!{" "}
              <SentimentVerySatisfiedOutlinedIcon sx={{ fontSize: "30px" }} />
            </p>
          </div>
        )}
      </Grid>
      {count > 1 && (
        <Pagination
          count={count}
          page={pagination.page}
          onChange={handlePages}
          sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        />
      )}
    </>
  );
};

export default CardsContainer;
