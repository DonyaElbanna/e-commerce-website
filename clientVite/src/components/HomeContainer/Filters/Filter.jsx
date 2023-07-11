import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CityFilter from "./CityFilter";
import CategoriesFilter from "./CategoriesFilter";
import PricesFilter from "./PricesFilter";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { handleFilters } from "../../../rtk/features/attrSlice";

const FilterButton = styled(Button)({
  color: "#be853f",
  textTransform: "none",
  fontSize: "1.25rem",
  padding: "3px 10px",
  backgroundColor: "transparent",
  border: "2px solid #be853f ",
  marginBottom: "5px",
  "&:hover": {
    backgroundColor: "#e1d9d9",
    // color: "black",
  },
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
    backgroundColor: "#cbd5e14f",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    sx={{ backgroundColor: "green" }}
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "1.2rem", color: "#be853f" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  "&.MuiTypography-root": {
    fontSize: 20,
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0)",
}));

const Filter = () => {
  const [expanded, setExpanded] = useState("");
  const dispatch = useDispatch();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const clearFilters = () => {
    dispatch(handleFilters());
  };

  return (
    <>
      <div className="filter-header text-center mb-2">
        <FilterButton variant="text" onClick={clearFilters}>
          Clear Filters
        </FilterButton>
      </div>
      <Accordion
        defaultExpanded={true}
        expanded={expanded === "cities"}
        onChange={handleChange("cities")}
        sx={{ borderRadius: "5px" }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            color: "#be853f",
            backgroundColor: "#cbd5e1",
            borderBottom: "1px solid #be853f",
          }}
          // style={{ color: "#be853f" }}
        >
          <Typography
            component="span"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Cities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            <CityFilter />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded={true}
        expanded={expanded === "categories"}
        onChange={handleChange("categories")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            backgroundColor: "#cbd5e1",
            borderBottom: "1px solid #be853f",
          }}
          style={{ color: "#be853f" }}
        >
          <Typography
            component="span"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            <CategoriesFilter />
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        defaultExpanded={true}
        expanded={expanded === "prices"}
        onChange={handleChange("prices")}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          sx={{
            backgroundColor: "#cbd5e1",
            borderBottom: "1px solid #be853f",
          }}
          style={{ color: "#be853f" }}
        >
          <Typography
            component="span"
            style={{ fontSize: "1.25rem", fontWeight: "bold" }}
          >
            Prices
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="span">
            <PricesFilter />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default Filter;
