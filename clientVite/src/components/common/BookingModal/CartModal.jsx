import { Card, Grid, Typography } from "@mui/material";
import React from "react";
import CartButton from "./CartButton";
import { useSelector } from "react-redux";
const CartModal = () => {
  const { parkGroup, book } = useSelector((state) => state);
  return (
    <Card
      sx={{
        padding: "10px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card>
            <CartButton
              name="Adult"
              parkDetails={parkGroup.parkDetails}
            />
            {parkGroup.parkDetails.childAvailable && (
              <CartButton
                name="Child"
                parkDetails={parkGroup.parkDetails}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              padding: "10px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              fontSize={{ xs: 14, md: 18, lg: 20 }}
              fontWeight="bolder"
              textAlign="center"
            >
              {book.bookingInfo.grandTotal}
            </Typography>
            <Typography
              fontWeight="bolder"
              color="green"
              fontSize={{ xs: 10, md: 14 }}
              textAlign="center"
            >
              All taxes and fees included
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartModal;
