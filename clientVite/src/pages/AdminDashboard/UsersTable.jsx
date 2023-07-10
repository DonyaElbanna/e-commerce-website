import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

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
const columns = [
  { id: "username", label: "Username", width: 100, flex: 1 },
  { id: "email", label: "Email", width: 100, flex: 1 },
  { id: "role", label: "Role", width: 100, flex: 1 },
  { id: "isBlocked", label: "Status", width: 100, flex: 1 },
  { id: "edit", label: "Edit", width: 100, flex: 1 },
  { id: "delete", label: "Delete", width: 100, flex: 1 },
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
  borderRadius: "10px",
  p: 4,
  textAlign: "center",
};

const Users = () => {
  // table state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id) => setOpen(true);
  const handleClose = () => setOpen(false);

  const { users, auth } = useSelector((state) => state);

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
      <Box sx={{ marginBottom: "15px", textAlign: "center" }}>
        <Button
          style={{
            color: "#be853f",
            border: "1px solid #be853f",
            boxShadow: "2px 2px #be853f",
            fontWeight: "bold",
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
                    sx={{ textAlign: "left", fontWeight: "bold" }}
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
                      <TableCell sx={{ padding: "5px 15px" }}>
                        {user.username}
                      </TableCell>
                      <TableCell sx={{ padding: "5px 15px" }}>
                        {user.email}
                      </TableCell>
                      <TableCell
                        sx={{ padding: "5px 15px", alignItems: "self-start" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <IconButton onClick={() => handleMakeAdmin(user._id)}>
                            {user.role == "admin" ? (
                              <Tooltip title="remove Admin">
                                <VerifiedUserOutlinedIcon
                                  sx={{ fontSize: "28px", color: "#48b748" }}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title="make Admin">
                                <AccountCircleOutlinedIcon
                                  sx={{ fontSize: "28px", color: "#ca4a4a" }}
                                />
                              </Tooltip>
                            )}
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ padding: "5px 15px" }}>
                        {user.isBlocked ? (
                          <Tooltip title="Unblock">
                            <IconButton
                              onClick={() => handleBlockUser(user._id)}
                            >
                              <PermIdentityOutlinedIcon
                                sx={{ color: "#48b748", fontSize: "30px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Block">
                            <IconButton
                              onClick={() => handleBlockUser(user._id)}
                            >
                              <PersonOffOutlinedIcon
                                sx={{ color: "#ca4a4a", fontSize: "30px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell sx={{ padding: "5px 15px" }}>
                        <Tooltip title="Edit">
                          <IconButton onClick={() => handleEditUser(user)}>
                            <BorderColorOutlinedIcon
                              sx={{ color: "#5151ac" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell sx={{ padding: "5px 15px" }}>
                        <Tooltip title="Delete">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleOpen(user._id)}
                          >
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
                              style: { backgroundColor: "rgba(0,0,0,0.3)" },
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
          count={users.users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default Users;
