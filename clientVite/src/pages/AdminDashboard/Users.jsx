import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import gif from "../../assets/gih.gif"
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";

const columns = [
  { id: "username", label: "Username", minWidth: 120 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "isBlocked", label: "Blocked Status", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100 },
  { id: "delete", label: "Delete", minWidth: 100 },
];

const Users = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const {common} = useSelector((state)=>state)
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(handleIsLoadingToggle())
    const getUsers = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/user`);
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.log(error)
      }
    };
    getUsers();
    dispatch(handleIsLoadingToggle())
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <Paper sx={{ width: 1000, overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440,width:"100%" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
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
                          {user.isBlocked ? "Blocked" : "Not Blocked"}
                        </TableCell>
                        <TableCell>
                          <button>Edit</button>
                        </TableCell>
                        <TableCell>
                          <button>Delete</button>
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
      )}
    </>
  );
};

export default Users;
