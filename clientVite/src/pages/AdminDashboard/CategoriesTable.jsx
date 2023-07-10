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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

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
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditCat(params.row)}>
            <BorderColorOutlinedIcon sx={{ color: "#5151ac" }} />
          </IconButton>
        </Tooltip>
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
      <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
        <Button
          variant="outlined"
          style={{
            color: "#be853f",
            border: "1px solid #be853f",
            boxShadow: "2px 2px #be853f",
            fontWeight: "bold",
          }}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={openCatModal}
        >
          Add a new record
        </Button>
      </Box>
      <div style={{ height: 500, width: "fit-content", margin: "auto" }}>
        <DataGrid
          rows={finalCats}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 7 },
            },
          }}
          pageSizeOptions={[7, 15]}
          hideFooterSelectedRowCount
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
  );
};

export default CategoriesTable;
