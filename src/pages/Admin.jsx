import { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AdminPanel from "../components/Admin/AdminPanel";
import userStore from "../stores/userStore";
import { useRedirectIfNotAdmin } from "../hooks";
import AllCollection from "../components/Admin/AllCollection";
import { useTranslation } from "react-i18next";
import AllItems from "../components/Admin/AllItems";

const Admin = () => {
  const { t } = useTranslation();
  const { user } = userStore();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useRedirectIfNotAdmin();

  return (
    <div
      className="flex flex-col justify-center max-w-[1200px] mx-auto
     my-[80px] border p-10 rounded-lg shadow-lg"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col gap-2 items-center">
          <span className="font-semibold">
            {t("admin_panel.hi")}, {user.first_name}!
          </span>
          <span>{t("admin_panel.desc")}</span>
        </div>
        <div className="flex flex-col justify-center items-center mt-5">
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label={t("admin_panel.label1")} value="1" />
              <Tab label={t("admin_panel.label2")} value="2" />
              <Tab label={t("admin_panel.label3")} value="3" />
            </TabList>

            <TabPanel value="1">
              <AdminPanel />
            </TabPanel>
            <TabPanel value="2">
              <AllCollection />
            </TabPanel>
            <TabPanel className="max-w-2xl w-full" value="3">
              <AllItems />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  );
};

export default Admin;
