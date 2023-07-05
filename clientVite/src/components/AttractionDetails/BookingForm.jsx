import { Dialog, Transition } from "@headlessui/react";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PaymentIcon from "@mui/icons-material/Payment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleStepBack,
  handleStepNext,
} from "../../rtk/features/bookingSlice";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(0,0,255) 0%, rgb(0,100,250) 50%, rgb(0,150,255) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(0,0,255) 0%, rgb(0,100,250) 50%, rgb(0,150,255) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(0,0,255) 0%, rgb(0,100,250) 50%, rgb(0,150,255) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(0,0,255) 0%, rgb(0,100,250) 50%, rgb(0,150,255) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <CalendarMonthIcon sx={{ fontSize: { xs: 20, md: 25, lg: 28 } }} />,
    2: <ShoppingCartIcon sx={{ fontSize: { xs: 20, md: 25, lg: 28 } }} />,
    3: <ContactMailIcon sx={{ fontSize: { xs: 20, md: 25, lg: 28 } }} />,
    // 4: <PaymentIcon sx={{ fontSize: { xs: 20, md: 25, lg: 28 } }} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = [
  "Date Selection",
  "Add To Cart",
  "Contact Information",
  // "Payment",
];

const BookingForm = (props) => {
  const [open, setOpen] = React.useState(true);
  const cancelButtonRef = React.useRef(null);
  const { book } = useSelector((state) => state);
  const [ErrorMessage, setErrorMessage] = React.useState("");
  const [activeStep, setActiveStep] = React.useState(book.bookingStep);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!open) {
      props.setOpenForm(false);
    }
  }, [open]);

  const handleBack = () => {
    setActiveStep((prev) => --prev);
    dispatch(handleStepBack());
  };
  const handleNext = () => {
    if (book.bookingStep === 0 && book.bookingInfo.travelDate) {
      setErrorMessage("");
      setActiveStep((prev) => ++prev);
      dispatch(handleStepNext());
    }
    if (book.bookingStep === 0 && !book.bookingInfo.travelDate) {
      setErrorMessage("Shoud Select Date Before");
    }
    if (
      book.bookingStep === 1 &&
      (book.bookingInfo.childCount || book.bookingInfo.adultCount)
    ) {
      setErrorMessage("");
      setActiveStep((prev) => ++prev);
      dispatch(handleStepNext());
    }
    if (
      book.bookingStep === 1 &&
      !book.bookingInfo.childCount &&
      !book.bookingInfo.adultCount
    ) {
      setErrorMessage("At least one ticket must be added");
    }
    if (
      book.bookingStep === 2 &&
      book.bookingInfo.contactNo.length > 8 &&
      book.bookingInfo.email &&
      book.bookingInfo.name
    ) {
      setErrorMessage("");
      setActiveStep((prev) => ++prev);
      dispatch(handleStepNext());
    }
    if (
      book.bookingStep === 2 &&
      (!book.bookingInfo.contactNo ||
        !book.bookingInfo.email ||
        !book.bookingInfo.name)
    ) {
      setErrorMessage("Please Fill Up Form");
    }
  };

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className=" p-5 mt-20 items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="m-auto sm:my-8 sm:w-full sm:max-w-lg">
                <Dialog.Title>
                  <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <Stack sx={{ width: "100%" }}>
                        <Stepper
                          alternativeLabel
                          activeStep={activeStep}
                          connector={<ColorlibConnector />}
                        >
                          {steps.map((label) => (
                            <Step key={label}>
                              <StepLabel
                                sx={{}}
                                StepIconComponent={ColorlibStepIcon}
                              >
                                <Typography
                                  sx={{
                                    fontSize: { xs: 12, sm: 14, md: 18 },
                                    fontWeight: { xs: 500 },
                                  }}
                                >
                                  {label}
                                </Typography>
                              </StepLabel>
                            </Step>
                          ))}
                        </Stepper>
                        <Typography
                          variant="body2"
                          textAlign="center"
                          color="red"
                          fontWeight={600}
                        >
                          {ErrorMessage}
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        >
                          <Button
                            disabled={book.bookingStep === 0}
                            onClick={handleBack}
                            sx={{
                              mr: 1,
                              fontWeight: { xs: 600, md: 900 },
                              fontSize: { xs: 14, md: 18 },
                            }}
                          >
                            Back
                          </Button>
                          <Box sx={{ flex: "1 1 auto" }} />
                          {activeStep !== steps.length - 1 && (
                            <Button
                              onClick={handleNext}
                              sx={{
                                fontWeight: { xs: 600, md: 900 },
                                fontSize: { xs: 14, md: 18 },
                              }}
                            >
                              Next
                            </Button>
                          )}
                        </Box>
                      </Stack>
                    </div>
                  </div>
                </Dialog.Title>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default BookingForm;
