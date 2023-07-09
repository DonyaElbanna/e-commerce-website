import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

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
  categoryEditHandler,
  removeCat,
  categoriesHandler,
} from "../../rtk/features/categoriesSlice";

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
  const { categories } = useSelector((state) => state);

  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = React.useState(false);
  const [slcID, setSlcID] = useState(null);

  const finalCats = categories?.categories.map((cat) => ({
    id: cat._id,
    name: cat.type,
    image: cat.image,
  }));

  const handleOpen = (id) => {
    setOpen(true);
    setSlcID(id);
  };
  const handleClose = () => setOpen(false);

  const deleteCat = (id) => {
    // console.log(id);
    // const newCats = cats.filter((cat) => cat.id !== id);
    // setCats(newCats);
    dispatch(removeCat(id));
    handleClose();

    try {
      axios.delete(`http://localhost:9999/subcat/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditCat = (cat) => {
    dispatch(handleAuthType("addCat"));
    dispatch(handleToggleAuthModal());
    dispatch(categoryEditHandler(cat));
    dispatch(categoriesHandler(categories.categories));
  };

  const openCatModal = () => {
    dispatch(handleAuthType("addCat"));
    dispatch(handleToggleAuthModal());
    dispatch(categoryEditHandler());
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
          onClick={() => handleEditCat(params.row)}
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
                    onClick={() => deleteCat(slcID)}
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
<<<<<<< HEAD
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "250px", marginTop:'180px' }} />
      ) : (
        <>
          <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Button
              variant="outlined"
              style={{
                color: "#be853f",
                border: "1px solid #be853f",
                boxShadow: "2px 2px #be853f",
              }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={openCatModal}
            >
              Add a new record
            </Button>
          </Box>
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={finalCats || cats}
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
=======
      <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
        <Button
          variant="outlined"
          style={{
            color: "#be853f",
            border: "1px solid #be853f",
            boxShadow: "2px 2px #be853f",
          }}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={openCatModal}
        >
          Add a new record
        </Button>
      </Box>
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={finalCats}
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
>>>>>>> c0592e2e583694d85603a5aa2b759fae3b1f0e2d
    </>
  );
};

export default CategoriesTable;
