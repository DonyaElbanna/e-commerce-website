import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";
import scroll from "tailwind-scrollbar";
import { Dialog, Transition } from "@headlessui/react";
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
import { Link } from "react-router-dom";
import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../rtk/features/authSlice";

// modal styles
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
//   textAlign: "center",
// };

const Attractions = () => {
  const [attrs, setAttrs] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  // modal state
  const [open, setOpen] = useState(false);
  const [slcID, setSlcID] = useState(null);

  const handleOpen = (id) => {
    setOpen(true);
    setSlcID(id);
  };
  // console.log(slcID);

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
  // const columns = [
  //   {
  //     field: "name",
  //     headerName: "Name",
  //     width: 150,
  //   },
  //   { field: "city", headerName: "City", width: 130 },
  //   { field: "category", headerName: "Category", width: 130 },
  //   { field: "status", headerName: "Status", width: 120 },
  //   {
  //     field: "edit",
  //     headerName: "Edit",
  //     sortable: false,
  //     width: 90,
  //     renderCell: (index, params) => (
  //       <Button
  //         variant="outlined"
  //         onClick={() => handleButtonClick(params.row.id)}
  //         sx={{
  //           color: "#be853f",
  //           border: "1px solid orange",
  //           ":hover": {
  //             border: "1px solid #be853f",
  //             backgroundColor: "#ffc0715c",
  //           },
  //         }}
  //       >
  //         Edit
  //       </Button>
  //     ),
  //   },
  //   {
  //     field: "delete",
  //     headerName: "Delete",
  //     sortable: false,
  //     width: 90,
  //     renderCell: (params) => (
  //       <>
  //         <Tooltip title="Delete">
  //           <IconButton onClick={() => handleOpen(params.row.id)}>
  //             <DeleteIcon />
  //           </IconButton>
  //         </Tooltip>
  //         <Modal
  //           aria-labelledby="transition-modal-title"
  //           aria-describedby="transition-modal-description"
  //           open={open}
  //           onClose={handleClose}
  //           closeAfterTransition
  //           slots={{ backdrop: Backdrop }}
  //           slotProps={{
  //             backdrop: {
  //               timeout: 500,
  //             },
  //           }}
  //         >
  //           <Fade in={open}>
  //             <Box sx={style}>
  //               <Typography
  //                 id="transition-modal-title"
  //                 variant="h6"
  //                 color="black"
  //                 component="h2"
  //                 sx={{ marginBottom: "20px" }}
  //               >
  //                 Are you sure you want to delete this attraction item?
  //               </Typography>
  //               <Stack
  //                 direction="row"
  //                 spacing={4}
  //                 sx={{
  //                   display: "flex",
  //                   justifyContent: "center",
  //                 }}
  //               >
  //                 <Button
  //                   variant="outlined"
  //                   onClick={handleClose}
  //                   sx={{
  //                     color: "#be853f",
  //                     border: "1px solid #be853f",
  //                     ":hover": {
  //                       border: "1px solid #be853f",
  //                     },
  //                   }}
  //                 >
  //                   No, go back
  //                 </Button>
  //                 <Button
  //                   variant="contained"
  //                   onClick={() => deleteAttr(slcID)}
  //                   sx={{
  //                     border: "1px solid #be853f",
  //                     backgroundColor: "#be853f",
  //                     ":hover": {
  //                       border: "1px solid #be853f",
  //                       backgroundColor: "#be853f",
  //                     },
  //                   }}
  //                 >
  //                   Yes, delete
  //                 </Button>
  //               </Stack>
  //             </Box>
  //           </Fade>
  //         </Modal>
  //       </>
  //     ),
  //   },
  // ];
  const columns = [
    {
      field: "name",
      headerName: "Name",
    },
    { field: "city", headerName: "City" },
    { field: "category", headerName: "Category" },
    { field: "status", headerName: "Status" },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (index, params) => (
        // <Button
        //   variant="outlined"
        //   onClick={() => handleButtonClick(params.row.id)}
        //   sx={{
        //     color: "#be853f",
        //     border: "1px solid orange",
        //     ":hover": {
        //       border: "1px solid #be853f",
        //       backgroundColor: "#ffc0715c",
        //     },
        //   }}
        // >
        //   Edit
        // </Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="blue"
          className="w-6 h-6"
          onClick={() => handleButtonClick(params.row.id)}
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => (
        <>
          {/* <Tooltip title="Delete">
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
          </Modal> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="red"
            className="w-6 h-6"
            onClick={() => handleOpen(params.row.id)}
          >
            <path
              fillRule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
              clipRule="evenodd"
            />
          </svg>

          {/* <dialog
            id="my_modal_5"
            className="modal m-auto bg-black/30 md:w-full"
            open={open}
            onClose={handleClose}
          >
            <form
              method="dialog"
              className="modal-box max-w-sm bg-white shadow-none"
            >
              <h3 className="font-bold text-lg text-[#be853f] text-center">
                Are you sure you want to delete this user?
              </h3>
              <div className="modal-action flex justify-between">
                <button
                  className="btn text-xs btn-outline text-[#be853f] border-[#be853f] hover:bg-black hover:border-none hover:text-white"
                  onClick={handleClose}
                >
                  No, go back
                </button>
                <button
                  className="btn text-xs btn-outline text-[#be853f] border-[#be853f] hover:bg-red-700 hover:border-none hover:text-white"
                  onClick={() => deleteAttr(slcID)}
                >
                  Yes, delete
                </button>
              </div>
            </form>
          </dialog> */}
        </>
      ),
    },
  ];

  const handleButtonClick = (x) => {
    console.log(x);
  };

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
            status: attr.status,
          }))
        );
      } catch (err) {
        console.log(err);
      }
    };

    getAttrs();
    dispatch(handleIsLoadingToggle());
  }, []);

  const openAttrModal = () => {
    dispatch(handleAuthType("addAttr"));
    dispatch(handleToggleAuthModal());
    // dispatch(CityEditHandler());
  };

  return (
    <>
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <>
          {/* <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Link to="/form">
              <Button
                style={{
                  color: "#be853f",
                  border: "1px solid #be853f",
                  boxShadow: "2px 2px #be853f",
                }}
                startIcon={<AddCircleOutlineOutlinedIcon />}
                // onClick={openAttrModal}
              >
                Add a new record
              </Button>
            </Link>
          </Box> */}
          {/* <div
            style={{
              display: "table",
              tableLayout: "fixed",
              width: "80%",
              margin: "auto",
            }}
          >
            <DataGrid
              rows={attrs}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 20]}
              checkboxSelection
              style={{ maxHeight: 500 }}
            />
          </div> */}
          <section className="">
            <div className="text-center my-7">
              <Link to="/form">
                <button className="btn btn-outline text-[#be853f] border-[#be853f] hover:bg-[#be853f] hover:text-gray-800 hover:border-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                  Add a new record
                </button>
              </Link>
            </div>
            <div className="overflow-x-auto text-gray-800 scrollbar scrollbar-thumb-[#be853f] scrollbar-track-gray-100 py-4">
              <table className="table w-7/12 m-auto shadow-md shadow-gray-500 rounded-lg">
                <DataGrid
                  rows={attrs}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 20]}
                  checkboxSelection
                  style={{ minHeight: 600, border: "none" }}
                />
              </table>
            </div>
            <dialog
              id="my_modal_5"
              className="modal m-auto bg-black/80 md:w-full"
              open={open}
              onClose={handleClose}
            >
              <form
                method="dialog"
                className="modal-box max-w-sm bg-white shadow-none"
              >
                <h3 className="font-bold text-lg text-[#be853f] text-center">
                  Are you sure you want to delete this user?
                </h3>
                <div className="modal-action flex justify-between">
                  <button
                    className="btn text-xs btn-outline text-[#be853f] border-[#be853f] hover:bg-black hover:border-none hover:text-white"
                    onClick={handleClose}
                  >
                    No, go back
                  </button>
                  <button
                    className="btn text-xs btn-outline text-[#be853f] border-[#be853f] hover:bg-red-700 hover:border-none hover:text-white"
                    onClick={() => deleteAttr(slcID)}
                  >
                    Yes, delete
                  </button>
                </div>
              </form>
            </dialog>
          </section>
        </>
      )}
    </>
  );
};

export default Attractions;
