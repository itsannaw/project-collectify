import api from "../api/http";
import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminPanel from "../components/Admin/AdminPanel";
import NavBar from "../components/Home/NavBar";

const Admin = () => {
  //   const [loading, setLoading] = React.useState(true);
  //   function handleClick() {
  //     setLoading(true);
  //   }
  const [name, setName] = useState([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const getUserName = async () => {
    try {
      const { data } = await api.get("users/name_users");
      setName(data || []);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <NavBar />
      <div className="flex flex-col justify-center max-w-[1200px] mx-auto my-[80px] border p-10 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex flex-col gap-2 items-center">
            <span onChange={getUserName}>
              Hello, <b>{name}</b>!
            </span>
            <span>
              This is the user and content management dashboard for the site.
            </span>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <TabContext value={value}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="All Users" value="1" />
                <Tab label="All Collections" value="2" />
                <Tab label="All Items" value="3" />
              </TabList>

              <TabPanel value="1">
                <AdminPanel />
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
