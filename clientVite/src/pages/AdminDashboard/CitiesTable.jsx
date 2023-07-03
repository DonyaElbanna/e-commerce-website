import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import axios from "axios";
import gif from "../../assets/gih.gif";
import { useDispatch, useSelector } from "react-redux";
import { handleIsLoadingToggle } from "../../rtk/features/commonSlice";

const columns = [
  { field: "name", headerName: "City", width: 120 },
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

const CitiesTable = () => {
  const [cities, setCities] = useState([]);

  const { common } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleIsLoadingToggle());

    const getCities = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/category`);
        // console.log(data.categories);
        setCities(data.categories.map((city) => ({
            id: city._id,
            name: city.city,
          })));
      } catch (error) {
        console.log(error);
      }
    };

    getCities();
    dispatch(handleIsLoadingToggle());
  }, []);

// console.log(cities)

  return (
    <>
      {common.isLoading ? (
        <img src={gif} className="mx-auto" style={{ width: "150px" }} />
      ) : (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={cities}
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

export default CitiesTable;
