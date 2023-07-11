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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { attractionEditHandler } from "../../rtk/features/attrSlice";

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

const Attractions = () => {
  const [attrs, setAttrs] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = useState(false);
  const [slcID, setSlcID] = useState(null);

  const navigate = useNavigate();

  const handleOpen = (id) => {
    setOpen(true);
    setSlcID(id);
  };
  // console.log(slcID);

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getAttrs = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/attraction`);
        // console.log(data.AllAttraction);
        setAttrs(
          data.AllAttraction.map((attr) => ({
            id: attr._id,
            name: attr.name,
            city: attr.category.city,
            category: attr.subcategory.type,
            status: attr.status ? "Available" : "Not Available",
            childAvailability: attr.childAvailable
              ? "Available"
              : "Not available",
            adultPrice: "$" + attr.AdultPrice,
            childPrice: "$" + attr.ChildPrice,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };

    getAttrs();
    dispatch(handleIsLoadingToggle());
  }, []);
  // console.log("final", attrs);

  const handleClose = () => setOpen(false);

  const deleteAttr = (id) => {
    // console.log(id);
    // optimistic update
    const newAttrs = attrs.filter((attr) => attr.id !== id);
    setAttrs(newAttrs);
    handleClose();

    try {
      axios.delete(`http://localhost:9999/attraction/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(attrs);

  // table cols
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    {
      field: "city",
      headerName: "City",
      width: 125,
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 105,
      disableColumnMenu: true,
    },
    {
      field: "childAvailability",
      headerName: "Children",
      width: 110,
      disableColumnMenu: true,
    },
    {
      field: "adultPrice",
      headerName: "Adult Price",
      width: 105,
      disableColumnMenu: true,
    },
    {
      field: "childPrice",
      headerName: "Child Price",
      width: 105,
      disableColumnMenu: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 80,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Tooltip title="Edit">
          <IconButton onClick={() => openEditAttrForm(params.row.id)}>
            <BorderColorOutlinedIcon sx={{ color: "#5151ac" }} />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 70,
      disableColumnMenu: true,
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
                    onClick={() => deleteAttr(slcID)}
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

  const openAddAttrForm = () => {
    dispatch(attractionEditHandler());
    navigate("/form");
  };

  const openEditAttrForm = (attrID) => {
    console.log(attrID);
    dispatch(attractionEditHandler(attrID));
    navigate("/form");
  };

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
              onClick={openAddAttrForm}
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
              rows={attrs}
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

export default Attractions;
