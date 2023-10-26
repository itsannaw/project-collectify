import { LoadingButton } from "@mui/lab";
import { Avatar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import { Person } from "@mui/icons-material";
import { TabPanel } from "@mui/joy";
import SettingsIcon from "@mui/icons-material/Settings";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import FavouriteTable from "../components/UserAccount/FavouriteTable";

const UserAccount = () => {
  //   const [loading, setLoading] = React.useState(true);
  //   function handleClick() {
  //     setLoading(true);
  //   }

  return (
    <section className="flex flex-col justify-center max-w-[1000px] mx-auto my-[80px] border p-10 rounded-lg shadow-lg">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-xl">Hi!</span>
          <img className="w-[20px] h-[20px]" src="hi.svg" alt="" />
        </div>
        <span>
          This is your personal account, here you can get various information
          about the collections you like and also create your own!
        </span>
        <Tabs
          className="flex max-w-[800px] mx-auto w-full items-center mt-8"
          //   aria-label="Icon tabs"
          defaultValue={0}
        >
          <TabList>
            <Tab>
              <ListItemDecorator>
                <Person />
              </ListItemDecorator>
              Profile
            </Tab>
            <Tab>
              <ListItemDecorator>
                <FavoriteIcon />
              </ListItemDecorator>
              Favourite
            </Tab>
            <Tab>
              <ListItemDecorator>
                <LibraryBooksIcon />
              </ListItemDecorator>
              Your collections
            </Tab>
            <Tab>
              <ListItemDecorator>
                <SettingsIcon />
              </ListItemDecorator>
              Settings
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <div className="flex mt-7 gap-8">
              <Avatar
                sx={{ width: 200, height: 200 }}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <div className="flex flex-col gap-10 mt-6">
                <span className="font-semibold">Full name: user</span>
                <span className="font-semibold">Email: user@mail.ru</span>
                <LoadingButton
                  size="small"
                  // onClick={handleClick}
                  // endIcon={<SendIcon />}
                  // loading={loading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Edit photo
                </LoadingButton>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={1}>
            {" "}
            <div className="flex flex-col justify-center items-center gap-6 mt-5 max-w-[800px] w-full mx-auto">
              <FavouriteTable />
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
};

export default UserAccount;
