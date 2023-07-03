import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";

const columns = [
  { field: "name", headerName: "City", width: 150 },
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

const CategoriesTable = () => {
  const [cats, setCats] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getCats = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/subcat`);
        // console.log(data.subcategories);
        setCats(data.subcategories.map((cat) => ({
            id: cat._id,
            name: cat.type,
          })));
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
          />
        </div>
      )}
    </>
  );
};

export default CategoriesTable;
