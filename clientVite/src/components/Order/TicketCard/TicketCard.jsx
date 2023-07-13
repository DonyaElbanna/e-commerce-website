import React, { useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Collapse,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
// import QR from "../../../images/common/api.qrserver.png"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const TicketCard = ({ Ticket,allDate}) => {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <Box display="flex" gap={1}>
        <Box flex={1}>
          <CardMedia
            component="img"
            sx={{
              height: { xs: 200, md: 300, lg: "auto" },
            }}
            image={Ticket.MainImage}
            alt="Paella dish"
          />
        </Box>
        <Box flex={2}>
            <Box
              sx={{
                padding: "10px",
                display: "flex",

                gap: 2,
                border: "1px solid black",
                borderRadius: 3,
                flexDirection: { xs: "column"},
                height:"100%",
                p:1
              }}
            >
            <Box  display="flex" justifyContent="space-between">
              <Box display="flex"  flexDirection="column" alignItems="center">
                <CardMedia
                  component="img"
                  sx={{
                    height: { xs: 50, md: 80 },
                    width: { xs: 50, md: 80 },
                  }}
                  image={`${Ticket.barCodeImagePath}`}
                  alt="QrCode"
                />
                <Typography>{Ticket.ticketNumber}</Typography>
              </Box>
              <CardMedia
                component="img"
                
                sx={{
                  height: { xs: 50, md: 100},
                  width: { xs: 50, md: 100 },
                }}
                image={`${Ticket.LogoImage}`}
                alt="logo"
              />
            </Box>
              <Box
                color="black"
                width="100%"
                textAlign="center"
                p={1}
                borderRadius={3}
              >
                <Typography
                  fontWeight={{ xs: 600, md: 700, lg: 900 }}
                  fontSize={{ xs: 10, md: 16, lg: 20 }}
                  sx={{
                    width: { xs: "100%" },
                  }}
                >
                  TourName: {Ticket.tourname}
                </Typography>
                <Typography
                  fontWeight={{ xs: 600, md: 700, lg: 900 }}
                  fontSize={{ xs: 10, md: 16, lg: 20 }}
                  sx={{
                    width: { xs: "100%" },
                  }}
                >
                  TravelDate: {new Date(Ticket.travelDate.split("T")[0]).toDateString()}
                </Typography>
              </Box>
            </Box>
        </Box>
      </Box>


    </Card>
  );
};

export default TicketCard;
