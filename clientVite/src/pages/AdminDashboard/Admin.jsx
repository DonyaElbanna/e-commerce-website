import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Users from "./UsersTable";
import Attractions from "./AttractionsTable";
import CitiesTable from "./CitiesTable";
import CategoriesTable from "./CategoriesTable";
import Orders from "./OrdersTable";
import TransactionsTable from "./TransactionsTable";

// icons
import PersonPinIcon from "@mui/icons-material/PersonPin";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AttractionsOutlinedIcon from "@mui/icons-material/AttractionsOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className="mx-auto w-5/6 sm:w-4/6 lg:w-9/12"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 4, px: 1 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const smallSc = useMediaQuery("(min-width:640px)");

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "fit-content",
        flexDirection: smallSc ? "row" : "column",
        alignItems: "flex-start",
      }}
    >
      <Tabs
        orientation={smallSc ? "vertical" : "horizontal"}
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          overflow: "unset",
          ".Mui-selected": {
            color: "#be853f !important",
          },
          "&& .MuiTab-root": {
            alignSelf: "baseline",
          },
        }}
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: { backgroundColor: "orange" },
        }}
      >
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<AttractionsOutlinedIcon />}
          iconPosition="start"
          label="Attractions"
          {...a11yProps(0)}
        />
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<PersonPinIcon />}
          iconPosition="start"
          label="Users"
          {...a11yProps(1)}
        />
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<PlaceOutlinedIcon />}
          iconPosition="start"
          label="Cities"
          {...a11yProps(2)}
        />
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<CategoryOutlinedIcon />}
          iconPosition="start"
          label="Categories"
          {...a11yProps(3)}
        />
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<InventoryOutlinedIcon />}
          iconPosition="start"
          label="Orders"
          {...a11yProps(4)}
        />
        <Tab
          disableRipple
          sx={{ fontWeight: "bolder" }}
          icon={<PaidOutlinedIcon />}
          iconPosition="start"
          label="Transactions"
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Attractions />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Users />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CitiesTable />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <CategoriesTable />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Orders />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <TransactionsTable />
      </TabPanel>
    </Box>
  );
}
