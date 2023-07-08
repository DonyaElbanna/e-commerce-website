import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";
import scroll from "tailwind-scrollbar";
import { Dialog, Transition } from "@headlessui/react";
=======
>>>>>>> c0592e2e583694d85603a5aa2b759fae3b1f0e2d
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import {
  handleAuthType,
  handleToggleAuthModal,
} from "../../rtk/features/authSlice";
import {
  userEditHandler,
  usersHandler,
  removeUser,
  blockUser,
  makeAdmin,
} from "../../rtk/features/usersSlice";

// table cols
// const columns = [
//   { id: "username", label: "Username", minWidth: 100, flex: 1 },
//   { id: "email", label: "Email", minWidth: 100, flex: 1 },
//   { id: "role", label: "Role", minWidth: 170, flex: 1 },
//   { id: "isBlocked", label: "Blocked Status", minWidth: 100, flex: 1 },
//   { id: "edit", label: "Edit", minWidth: 100, flex: 1 },
//   { id: "delete", label: "Delete", minWidth: 100, flex: 1 },
// ];

const columns = [
  { id: "username", label: "Username" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "isBlocked", label: "Block Status" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

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

const Users = () => {
  // table state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => setOpen(true);
  const handleClose = () => setOpen(false);

<<<<<<< HEAD
  const [users, setUsers] = useState([]);
=======
  const { users } = useSelector((state) => state);
>>>>>>> c0592e2e583694d85603a5aa2b759fae3b1f0e2d
  // console.log(users);

  const dispatch = useDispatch();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:9999/user");
        dispatch(usersHandler(data));
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    dispatch(removeUser(id));
    handleClose();
    try {
      axios.delete(`http://localhost:9999/user/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBlockUser = async (id) => {
    dispatch(blockUser(id));
    try {
      await axios.get(`http://localhost:9999/user/block/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMakeAdmin = async (id) => {
    dispatch(makeAdmin(id));
    try {
      await axios.get(`http://localhost:9999/user/role/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const openUserModal = () => {
    dispatch(handleAuthType("addUser"));
    dispatch(handleToggleAuthModal());
    dispatch(userEditHandler());
  };

  const handleEditUser = (user) => {
    dispatch(handleAuthType("addUser"));
    dispatch(handleToggleAuthModal());
    dispatch(userEditHandler(user));
    dispatch(usersHandler(users.users));
  };

  return (
    <>
<<<<<<< HEAD
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <>
          {/* <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
            <Button
              style={{
                color: "#be853f",
                border: "1px solid #be853f",
                boxShadow: "2px 2px #be853f",
              }}
              startIcon={<AddCircleOutlineOutlinedIcon />}
              onClick={openUserModal}
            >
              Add a new record
            </Button>
          </Box> */}
          {/* <Paper sx={{ width: "100%", overflow: "hidden", display: "grid" }}>
            <TableContainer
              sx={{ maxHeight: 440, width: "100%", margin: "auto" }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={user._id}
                        >
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                           
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              {user.role}
                              <Button
                                type="button"
                                classNameName="p-2 mt-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-blue-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() => addRemoveAdmin(user._id)}
                                sx={{
                                  color: "#be853f",
                                  border: "1px solid orange",
                                  marginTop: "5px",
                                  ":hover": {
                                    border: "1px solid #be853f",
                                    backgroundColor: "#ffc0715c",
                                    color: "#be853f",
                                  },
                                }}
                              >
                                {user.role == "admin" ? "remove" : "make"} Admin
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {user.isBlocked ? (
                              <Button
                                variant="outlined"
                                onClick={() => blockUser(user._id)}
                                sx={{
                                  color: "#be853f",
                                  border: "1px solid orange",
                                  marginTop: "5px",
                                  ":hover": {
                                    border: "1px solid #be853f",
                                    backgroundColor: "#ffc0715c",
                                    color: "#be853f",
                                  },
                                }}
                              >
                                Unblock
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                startIcon={<BlockOutlinedIcon />}
                                onClick={() => blockUser(user._id)}
                                sx={{
                                  color: "#be853f",
                                  border: "1px solid orange",
                                  ":hover": {
                                    border: "1px solid #be853f",
                                    backgroundColor: "#ffc0715c",
                                  },
                                }}
                              >
                                Block
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              sx={{
=======
      <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
        <Button
          style={{
            color: "#be853f",
            border: "1px solid #be853f",
            boxShadow: "2px 2px #be853f",
          }}
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={openUserModal}
        >
          Add a new record
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden", display: "grid" }}>
        <TableContainer sx={{ maxHeight: 440, width: "100%", margin: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={user._id}
                    >
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          {user.role}
                          <Button
                            type="button"
                            className="p-2 mt-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-blue-400 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => handleMakeAdmin(user._id)}
                            sx={{
                              color: "#be853f",
                              border: "1px solid orange",
                              marginTop: "5px",
                              ":hover": {
                                border: "1px solid #be853f",
                                backgroundColor: "#ffc0715c",
>>>>>>> c0592e2e583694d85603a5aa2b759fae3b1f0e2d
                                color: "#be853f",
                              },
                            }}
                          >
                            {user.role == "admin" ? "remove" : "make"} Admin
                          </Button>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {user.isBlocked ? (
                          <Button
                            variant="outlined"
                            onClick={() => handleBlockUser(user._id)}
                            sx={{
                              color: "#be853f",
                              border: "1px solid orange",
                              marginTop: "5px",
                              ":hover": {
                                border: "1px solid #be853f",
                                backgroundColor: "#ffc0715c",
                                color: "#be853f",
                              },
                            }}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            startIcon={<BlockOutlinedIcon />}
                            onClick={() => handleBlockUser(user._id)}
                            sx={{
                              color: "#be853f",
                              border: "1px solid orange",
                              ":hover": {
                                border: "1px solid #be853f",
                                backgroundColor: "#ffc0715c",
                              },
                            }}
                          >
                            Block
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#be853f",
                            border: "1px solid orange",
                            ":hover": {
                              border: "1px solid #be853f",
                              backgroundColor: "#ffc0715c",
                            },
                          }}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleOpen(user._id)}
                          >
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
<<<<<<< HEAD
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
                                    Are you sure you want to delete this user?
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
                                      onClick={() => deleteUser(user._id)}
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
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper> */}
          <section>
            <div className="text-center my-7">
              <button
                className="btn btn-outline text-[#be853f] border-[#be853f] hover:bg-[#be853f] hover:text-gray-800 hover:border-none"
                onClick={openUserModal}
              >
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
            </div>
            <div className="overflow-x-auto shadow-md shadow-gray-500 text-gray-800 rounded-lg scrollbar scrollbar-thumb-[#be853f] scrollbar-track-gray-100">
              <table className="table">
                <thead className="text-gray-800">
                  <tr>
                    {columns.map((column) => (
                      <th key={column.id}>{column.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <tr hover role="checkbox" tabIndex={-1} key={user._id}>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            {user.role}
                            {user.role == "admin" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                                className="w-6 h-6"
                                onClick={() => addRemoveAdmin(user._id)}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M11.484 2.17a.75.75 0 011.032 0 11.209 11.209 0 007.877 3.08.75.75 0 01.722.515 12.74 12.74 0 01.635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 01-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 01.722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zM12 15a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="green"
                                className="w-6 h-6"
                                onClick={() => addRemoveAdmin(user._id)}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </td>
                          <td>
                            {user.isBlocked ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="blue"
                                className="w-6 h-6"
                                onClick={() => blockUser(user._id)}
                              >
                                <path d="M18 1.5c2.9 0 5.25 2.35 5.25 5.25v3.75a.75.75 0 01-1.5 0V6.75a3.75 3.75 0 10-7.5 0v3a3 3 0 013 3v6.75a3 3 0 01-3 3H3.75a3 3 0 01-3-3v-6.75a3 3 0 013-3h9v-3c0-2.9 2.35-5.25 5.25-5.25z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="red"
                                className="w-6 h-6"
                                onClick={() => blockUser(user._id)}
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </td>
                          <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="blue"
                              className="w-6 h-6"
                              onClick={() => handleEditUser(user)}
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                              <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                          </td>
                          <td>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="red"
                              className="w-6 h-6"
                              onClick={() => handleOpen(user._id)}
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                clipRule="evenodd"
                              />
                            </svg>

                            <dialog
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
                                    onClick={() => deleteUser(user._id)}
                                  >
                                    Yes, delete
                                  </button>
                                </div>
                              </form>
                            </dialog>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </section>
        </>
      )}
=======
                                Are you sure you want to delete this user?
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
                                  onClick={() => deleteUser(user._id)}
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
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={users.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
>>>>>>> c0592e2e583694d85603a5aa2b759fae3b1f0e2d
    </>
  );
};

export default Users;
