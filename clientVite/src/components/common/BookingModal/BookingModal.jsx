import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomizedSteppers from "./StepperModal";
import CartModal from "./CartModal";
import CloseIcon from "@mui/icons-material/Close";
import DateModal from "./DateModal";
import ContactInformationModal from "./ContactInformationModal";
import {
  handleBookInfo,
  handleToggleBookModal,
} from "../../../rtk/features/bookingSlice";
// // import CreditCard from "../../checkout/CreditCard";
// import axios from "axios";
// import {
//   handleErrorMessage,
//   handleIsError,
// } from "../../../rtk/features/commonSlice";
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
  const { book, attractions } = useSelector((state) => state);
  // console.log(attractions)
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
              {attractions.AttractionDetails?.name} - Tickets - Booking
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
          {book.bookingStep === 0 && <DateModal />}
          {book.bookingStep === 1 && <CartModal />}
          {book.bookingStep === 2 && <ContactInformationModal />}
          {book.bookingStep === 3 && <CreditCard />}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookingModal;
