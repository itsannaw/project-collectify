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
import { useTranslation } from "react-i18next";
import FavouriteItems from "../components/UserAccount/FavouriteItems";

const UserAccount = () => {
  const { t } = useTranslation();
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
          <span className="font-bold text-xl">{t("user.hi")}</span>
          <img className="w-[20px] h-[20px]" src="/hi.svg" alt="" />
        </div>
        <span>{t("user.desc")}</span>
        <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="tabs">
            <Tab label={t("user.profile")} value="1" />
            <Tab label={t("user.fav")} value="2" />
            <Tab label={t("user.collec")} value="3" />
            <Tab label={t("user.settings")} value="4" />
          </TabList>

          <TabPanel value="1">
            <div className="flex mt-7 gap-8">
              <Avatar
                sx={{ width: 200, height: 200 }}
                alt="avatar"
                src={user.avatar}
              />
              <div className="flex flex-col gap-10 mt-6">
                <span className="font-semibold">
                  {t("user.name")} {user.first_name} {user.last_name}
                </span>
                <span className="font-semibold">
                  {t("user.email")} {user.email}
                </span>
                <label htmlFor="imageInput">
                  <LoadingButton
                    component="label"
                    size="small"
                    variant="contained"
                  >
                    {t("user.edit")}
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
          <TabPanel value="2">
            <FavouriteItems />
          </TabPanel>
          <TabPanel className="max-w-[900px] w-full" value="3">
            <CollectionTable />
          </TabPanel>
          <TabPanel value="4">{t("user.soon")}</TabPanel>
        </TabContext>
      </div>
    </div>
  );
};

export default UserAccount;
