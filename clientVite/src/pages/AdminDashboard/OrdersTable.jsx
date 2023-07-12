import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../rtk/features/authSlice";
import { ordersHandler, removeOrder } from "../../rtk/features/ordersSlice";

// modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  p: 4,
  textAlign: "center",
};

const Orders = () => {
  const { common, orders } = useSelector((state) => state);

  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = useState(false);
  const [slcOrderID, setSlcOrderID] = useState(null);
  const [slcOrderUserID, setSlcOrderUserID] = useState(null);

  useEffect(() => {
    dispatch(handleIsLoadingToggle());
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/order`);
        dispatch(ordersHandler(data));
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
    dispatch(handleIsLoadingToggle());
  }, []);

  // rows
  const finalOrders = orders?.orders.map((order) => ({
    id: order._id,
    name: order.user.username,
    attr: order.attraction.name,
    adults: order.adultCount,
    children: order.childCount,
    price: order.AdultTotalPrice + order.ChildTotalPrice + " $",
    date: new Date(order.travelDate.split("T")[0]).toDateString(),
  }));

  const openOrderModal = () => {
    dispatch(handleAuthType("addOrder"));
    dispatch(handleToggleAuthModal());
  };

  const handleOpen = (orderID) => {
    const orderUserID = orders.orders.filter((order) => order._id == orderID)[0]
      .user._id;
    setOpen(true);
    setSlcOrderID(orderID);
    setSlcOrderUserID(orderUserID);
  };

  const handleClose = () => setOpen(false);

  const deleteOrder = () => {
    dispatch(removeOrder(slcOrderID));
    handleClose();
    try {
      axios.delete(
        `http://localhost:9999/order/${slcOrderUserID}/${slcOrderID}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(finalOrders);

  // columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    { field: "attr", headerName: "Booked Tour", width: 150 },
    { field: "adults", headerName: "Adults", width: 110 },
    { field: "children", headerName: "Children", width: 125 },
    { field: "price", headerName: "Price", width: 110 },
    { field: "date", headerName: "Date", width: 140 },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleOpen(params.row.id)}>
              <DeleteIcon sx={{ color: "#ca4a4a" }} />
            </IconButton>
          </Tooltip>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 400,
                style: { backgroundColor: "rgba(0,0,0,0.2)" },
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  color="black"
                  component="h2"
                  sx={{ marginBottom: "20px" }}
                >
                  Are you sure you want to delete this attraction item?
                </Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      color: "#be853f",
                      border: "1px solid #be853f",
                      ":hover": {
                        border: "1px solid #be853f",
                      },
                    }}
                  >
                    No, go back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => deleteOrder(slcOrderID)}
                    sx={{
                      border: "1px solid #be853f",
                      backgroundColor: "#be853f",
                      ":hover": {
                        border: "1px solid #be853f",
                        backgroundColor: "#be853f",
                      },
                    }}
                  >
                    Yes, delete
                  </Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <>
      {common.isLoading ? (
        <img
          src={gif}
          className="mx-auto"
          style={{ width: "250px", marginTop: "180px" }}
        />
      ) : (
        <>
          <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Button
              style={{
                color: "#be853f",
                border: "1px solid #be853f",
                boxShadow: "2px 2px #be853f",
                fontWeight: "bold",
              }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={openOrderModal}
            >
              Add a new record
            </Button>
          </Box>
          <div
            style={{
              display: "table",
              tableLayout: "fixed",
              width: "fit-content",
              margin: "auto",
            }}
          >
            <DataGrid
              rows={finalOrders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 7 },
                },
              }}
              pageSizeOptions={[7, 15, 25]}
              style={{ maxHeight: 500 }}
              sx={{
                ".MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold !important",
                  fontSize: "15px",
                  textAlign: "center",
                },
                paddingLeft: "20px",
                ".MuiDataGrid-cell": {
                  outline: "none !important",
                },
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
