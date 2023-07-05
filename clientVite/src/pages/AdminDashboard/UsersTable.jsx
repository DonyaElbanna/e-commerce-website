import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import gif from "../../assets/gih.gif";

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

// table cols
const columns = [
  { id: "username", label: "Username", minWidth: 100, flex: 1 },
  { id: "email", label: "Email", minWidth: 100, flex: 1 },
  { id: "role", label: "Role", minWidth: 170, flex: 1 },
  { id: "isBlocked", label: "Blocked Status", minWidth: 100, flex: 1 },
  { id: "edit", label: "Edit", minWidth: 100, flex: 1 },
  { id: "delete", label: "Delete", minWidth: 100, flex: 1 },
];

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

const Users = () => {
  // table state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [users, setUsers] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getUsers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/user`);
        // console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
    dispatch(handleIsLoadingToggle());
  }, []);
  // console.log(users);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    // console.log(id);
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
    axios.delete(`http://localhost:9999/user/${id}`);
    handleClose();
  };

  const blockUser = async (id) => {
    console.log(id);
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            isBlocked: !user.isBlocked,
          };
        }
        return user;
      })
    );
    try {
      await axios.get(`http://localhost:9999/user/block/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const addRemoveAdmin = async (id) => {
    console.log(id);
    setUsers((prevState) =>
      prevState.map((user) => {
        if (user._id === id) {
          return {
            ...user,
            role: user.role == "admin" ? "user" : "admin",
          };
        }
        return user;
      })
    );
    try {
      await axios.get(`http://localhost:9999/user/role/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const openUserModal = () => {
    dispatch(handleAuthType("addUser"));
    dispatch(handleToggleAuthModal());
  };

  // console.log(users);
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
              onClick={openUserModal}
            >
              Add a new record
            </Button>
          </Box>
          <Paper sx={{ width: "100%", overflow: "hidden", display: "grid" }}>
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
                            {/* {user.role !== "admin" ? ( */}
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
          </Paper>
        </>
      )}
    </>
  );
};

export default Users;
