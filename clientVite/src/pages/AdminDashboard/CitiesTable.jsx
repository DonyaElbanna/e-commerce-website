import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";

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
import {
  CityEditHandler,
  citiesHandler,
  removeCity,
} from "../../rtk/features/citiesSlice";

// modal styles
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const CitiesTable = () => {
  const [Cities, setCities] = useState([]);

  const { common, cities } = useSelector((state) => state);
  // console.log(cities);

  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = React.useState(false);
  const [slcID, setSlcID] = useState(null);

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getCities = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/category`);
        dispatch(citiesHandler(data.categories));
        setCities(
          data.categories.map((city) => ({
            id: city._id,
            name: city.city,
            image: city.image,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    getCities();
    dispatch(handleIsLoadingToggle());
  }, []);

  const finalCities = cities?.cities.map((city) => ({
    id: city._id,
    name: city.city,
    image: city.image,
  }));

  const handleOpen = (id) => {
    setOpen(true);
    setSlcID(id);
  };
  const handleClose = () => setOpen(false);

  const deleteCity = (id) => {
    // console.log(id);
    // const newCities = Cities.filter((city) => city.id !== id);
    // setCities(newCities);
    dispatch(removeCity(id));
    handleClose();

    try {
      axios.delete(`http://localhost:9999/category/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(cities);

  const handleEditCity = (city) => {
    // console.log(city);
    dispatch(handleAuthType("addCity"));
    dispatch(handleToggleAuthModal());
    dispatch(CityEditHandler(city));
    dispatch(citiesHandler(cities.cities));
  };

  const openCityModal = () => {
    dispatch(handleAuthType("addCity"));
    dispatch(handleToggleAuthModal());
    dispatch(CityEditHandler());
  };

  // table cols
  const columns = [
    { field: "name", headerName: "City", width: 120 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleEditCity(params.row)}
          sx={{
            color: "#be853f",
            border: "1px solid orange",
            ":hover": {
              border: "1px solid #be853f",
              backgroundColor: "#ffc0715c",
            },
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleOpen(params.row.id)}>
              <DeleteIcon />
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
                timeout: 500,
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
                    onClick={() => deleteCity(slcID)}
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
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <>
          <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Button
              style={{
                color: "#be853f",
                border: "1px solid #be853f",
                boxShadow: "2px 2px #be853f",
              }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={openCityModal}
            >
              Add a new record
            </Button>
          </Box>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={finalCities || Cities}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
              hideFooterSelectedRowCount
            />
          </div>
        </>
      )}
    </>
  );
};

export default CitiesTable;
