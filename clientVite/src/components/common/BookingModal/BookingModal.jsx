import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CustomizedSteppers from "./StepperModal";
import CartModal from "./CartModal";
import ContactInformationModal from "./ContactInformationModal";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBookInfo,
  handleToggleBookModal,
} from "../../../rtk/features/bookingSlice";
import CloseIcon from "@mui/icons-material/Close";
// import CreditCard from "../../checkout/CreditCard";
import axios from "axios";
import DateModal from "./DateModal";
import { handleErrorMessage, handleIsError } from "../../../rtk/features/commonSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 2,
  py: 2,
  px: { xs: 2, sm: 4 },
  width: { xs: "80%", sm: "65%", md: "50%", lg: "40%" },
  minHeight: "50%",
};
const BookingModal = () => {
  const dispatch = useDispatch();
  const { book, parkGroup } = useSelector((state) => state);
  console.log(book)
  const CheckParkAvaliable = async (dateformat,dateValue) => {
    try {
      const res = await axios.post(`attraction/TicketPriceDetails`, {
        travelDate: dateformat,
        // parkId: parkGroup.parkDetails.parkId,
        // inventoryTypeId: parkGroup.parkDetails.inventoryTypeId,
        // ticketTypeId:book.bookingInfo.ticketTypeId,
        parkId: 79,
        inventoryTypeId: 611,
        ticketTypeId: 526,
      });
      dispatch(
        handleBookInfo({
          ...book.bookingInfo,
          travelDate: dateformat,
          dateValue: dateValue,
          AdultTotalGrand: res.data.TicketPriceAdult,
          ChildTotalGrand: res.data.TicketPriceChild,
        })
      );
      
    } catch (error) {
      dispatch(handleIsError(true))
      dispatch(handleErrorMessage(error.message))
    }
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={book.openBookModal}
      onClose={() => dispatch(handleToggleBookModal())}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={book.openBookModal}>
        <Box sx={style}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              textAlign="center"
              color="#0071eb"
              fontWeight={{ xs: 700, md: 800, lg: 900 }}
              fontSize={{ xs: 14, md: 16 }}
              p={1}
              width="100%"
            >
              {parkGroup.parkDetails.name} - Tickets - Booking
            </Typography>
            <Box
              sx={{
                backgroundColor: "rgb(233,64,87)",
                color: "white ",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(handleToggleBookModal())}
            >
              <CloseIcon />
            </Box>
          </Box>
          <CustomizedSteppers />
          {book.bookingStep === 0 && (
            <DateModal CheckParkAvaliable={CheckParkAvaliable} />
          )}
          {book.bookingStep === 1 && <CartModal />}
          {book.bookingStep === 2 && <ContactInformationModal />}
          {/* {book.bookingStep === 3 && < CreditCard/>} */}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookingModal;
