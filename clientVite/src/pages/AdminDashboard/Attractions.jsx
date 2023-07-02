import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: 150 },
  { field: "city", headerName: "City", width: 130 },
  { field: "category", headerName: "Category", width: 130 },
  { field: "status", headerName: "Status", width: 120 },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    width: 90,
    renderCell: (params) => (
      <button onClick={() => handleButtonClick(params.row)}>Edit</button>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 90,
    renderCell: (params) => (
      <button onClick={() => handleButtonClick(params.row)}>Delete</button>
    ),
  },
];

const Users = () => {
  const [attrs, setAttrs] = useState();

  useEffect(() => {
    const getAttrs = async () => {
      const { data } = await axios.get(`http://localhost:9999/attraction`);
      console.log(data.AllAttraction);
      setAttrs(
        data.AllAttraction.map((attr) => ({
          id: attr._id,
          name: attr.name,
          city: attr.category.city,
          category: attr.subcategory.type,
          status: attr.status,
          edit: "Edit",
          delete: "Delete",
        }))
      );
    };
    getAttrs();
  }, []);

  console.log(attrs);

  return (
    <>
      {!attrs ? (
        <div>loading</div>
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={attrs}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default Users;
