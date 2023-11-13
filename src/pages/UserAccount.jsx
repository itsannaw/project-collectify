import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { LoadingButton } from "@mui/lab";
import { Avatar } from "@mui/material";
import { useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import CollectionTable from "../components/UserAccount/Collections/CollectionTable";

const UserAccount = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <section>
      <NavBar />
      <div className="flex flex-col justify-center max-w-[1000px] mx-auto my-[70px] border p-10 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-2 items-center">
            <span className="font-bold text-xl">Hi!</span>
            <img className="w-[20px] h-[20px]" src="hi.svg" alt="" />
          </div>
          <span>
            This is your personal account, here you can get various information
            about the collections you like and also create your own!
          </span>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Profile" value="1" />
              <Tab label="Favourite" value="2" />
              <Tab label="Your collections" value="3" />
              <Tab label="Settings" value="4" />
            </TabList>

            <TabPanel value="1">
              <div className="flex mt-7 gap-8">
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  alt="Remy Sharp"
                  src="/static/images/avatar/1.jpg"
                />
                <div className="flex flex-col gap-10 mt-6">
                  <span className="font-semibold">Full name: </span>
                  <span className="font-semibold">Email: user@mail.ru</span>
                  <LoadingButton
                    size="small"
                    variant="contained"
                  >
                    Edit photo
                  </LoadingButton>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">
              <CollectionTable />
            </TabPanel>
            <TabPanel value="4">Item Three</TabPanel>
          </TabContext>
        </div>
      </div>
    </section>
  );
};

export default UserAccount;
