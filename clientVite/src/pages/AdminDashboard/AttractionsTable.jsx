import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";

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

const handleButtonClick = (x) => {
  console.log(x);
};

const Attractions = () => {
  const [attrs, setAttrs] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

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

  // console.log(attrs);

  return (
    <>
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
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
            pageSizeOptions={[10, 20]}
            checkboxSelection
          />
        </div>
      )}
    </>
  );
};

export default Attractions;
