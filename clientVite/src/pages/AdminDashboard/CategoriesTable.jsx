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
import CitiesModal from "./CitiesModal";

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

const CategoriesTable = () => {
  const [cats, setCats] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = React.useState(false);
  const [slcID, setSlcID] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setSlcID(id);
  };
  const handleClose = () => setOpen(false);

  const deleteCat = (id) => {
    // console.log(id);
    const newCats = cats.filter((cat) => cat.id !== id);
    setCats(newCats);
    handleClose();

    try {
      axios.delete(`http://localhost:9999/subcat/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "name", headerName: "City", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 90,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleButtonClick(params.row)}
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
                  Are you sure you want to delete this category item?
                </Typography>
                <Stack
                  direction="row"
                  spacing={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="outlined" onClick={handleClose}>
                    No, go back
                  </Button>
                  <Button variant="contained" onClick={() => deleteCat(slcID)}>
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

  const handleButtonClick = (x) => {
    console.log(x);
  };

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getCats = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/subcat`);
        // console.log(data.subcategories);
        setCats(
          data.subcategories.map((cat) => ({
            id: cat._id,
            name: cat.type,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    getCats();
    dispatch(handleIsLoadingToggle());
  }, []);

  // console.log(cats)

  return (
    <>
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <>
          <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            {/* <Button
              variant="outlined"
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Add a new record
            </Button> */}
            <CitiesModal />
          </Box>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={cats}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
              sx={{ minWidth: "500px" }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default CategoriesTable;
