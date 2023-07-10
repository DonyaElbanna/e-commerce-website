import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SearchGroup() {
  const { cities } = useSelector((state) => state);
  const Navigate = useNavigate();

  const handleNavigate = (tar) => {
    if (cities.cities?.find((city) => city.city === tar)) {
      const cityId = cities.cities?.find((city) => city.city === tar)._id;
      Navigate(`/city/${cityId}`);
    }
  };

  return (
    <Autocomplete
      freeSolo
      id="grouped-demo"
      disableClearable
      options={cities.cities?.map((option) => option.city)}
      onChange={(e) => handleNavigate(e.target.innerText)}
      onKeyDown={(e) => handleNavigate(e.target.innerText)}
      renderInput={(params) => (
        <TextField
          variant="filled"
          sx={{
            backgroundColor: "white",
            overflow: "hidden",
            borderRadius: "10px",
            fontWeight: "900",
            fontSize: "10px",
            marginTop: "10px",
            ".MuiFormLabel-root.Mui-focused": {
              color: "#00000099",
            },
          }}
          {...params}
          label="City Name"
          InputProps={{
            ...params.InputProps,
            type: "search",
            disableUnderline: true,
          }}
        />
      )}
    />
  );
}

// import * as React from "react";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function SearchGroup() {
//   const { cities } = useSelector((state) => state);
//   const Navigate = useNavigate();

//   const handleNavigate = (tar) => {
//     if (cities.cities?.find((city) => city.city === tar)) {
//       const cityId = cities.cities?.find((city) => city.city === tar)._id;
//       Navigate(`/city/${cityId}`);
//     }
//   };

//   return (
//     <Autocomplete
//       freeSolo
//       id="grouped-demo"
//       disableClearable
//       options={cities.cities?.map((option) => option.city)}
//       onChange={(e) => handleNavigate(e.target.innerText)}
//       onKeyDown={(e) => handleNavigate(e.target.innerText)}
//       renderInput={(params) => (
//         <TextField
//           variant="filled"
//           sx={{
//             backgroundColor: "white",
//             overflow: "hidden",
//             borderRadius: "10px",
//             fontWeight: "900",
//             fontSize: "10px",
//             marginTop: "10px",
//           }}
//           {...params}
//           label="City Name"
//           InputProps={{
//             ...params.InputProps,
//             type: "search",
//           }}
//         />
//       )}
//     />
//   );
// }
