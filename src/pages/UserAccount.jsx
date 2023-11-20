import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { LoadingButton } from "@mui/lab";
import { Avatar } from "@mui/material";
import { useState } from "react";
import CollectionTable from "../components/UserAccount/Collections/CollectionTable";
import userStore from "../stores/userStore";
import api from "../api/http";

const UserAccount = () => {
  const { user, setUser } = userStore();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditPhotoClick = async (e) => {
    const file = e.target.files[0];

    try {
      e.preventDefault();
      if (!file) {
        console.error("No image selected");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await api.post("create_avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser("avatar", data.avatar);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-[1200px] mx-auto my-[70px] border p-10 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl">Hi!</span>
          <img className="w-[20px] h-[20px]" src="/hi.svg" alt="" />
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
                src={user.avatar}
              />
              <div className="flex flex-col gap-10 mt-6">
                <span className="font-semibold">
                  Full name: {user.first_name} {user.last_name}
                </span>
                <span className="font-semibold">Email: {user.email}</span>
                <label htmlFor="imageInput">
                  <LoadingButton
                    component="label"
                    size="small"
                    variant="contained"
                  >
                    Edit photo
                    <input
                      type="file"
                      className="hidden-file-input"
                      accept="image/*"
                      onChange={handleEditPhotoClick}
                    />
                  </LoadingButton>
                </label>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="2">Soon...</TabPanel>
          <TabPanel className="max-w-[900px] w-full" value="3">
            <CollectionTable />
          </TabPanel>
          <TabPanel value="4">Soon...</TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default UserAccount;
