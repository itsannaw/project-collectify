import { Button, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";
import { useEffect, useState } from "react";
import api from "../../api/http";
import UserColumnTable from "./UserColumnTable";
import userStore from "../../stores/userStore";
import { useTranslation } from "react-i18next";

const AdminPanel = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const { user, setAdmin, logout } = userStore();

  const onMount = async () => {
    setIsLoading(true);
    const { data } = await api.get("users");

    setRows(data);
    // await getUserName();
    setIsLoading(false);
  };

  useEffect(() => {
    onMount();
  }, []);

  const onSelection = (ids) => {
    setSelectedIds(ids);
  };

  const onBlock = async () => {
    try {
      const { data } = await api.post("users/block", {
        selectedIds,
      });
      setRows(data || []);
      if (selectedIds.includes(user.id)) {
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onUnblock = async () => {
    try {
      const { data } = await api.post("users/unblock", {
        selectedIds,
      });
      setRows(data);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      const { data } = await api.post("users/delete", {
        selectedIds,
      });
      setRows(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const onSetAdmin = async () => {
    try {
      const { data } = await api.post("users/set_admin", {
        selectedIds,
      });
      setRows(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const onUnsetAdmin = async () => {
    try {
      const { data } = await api.post("users/unset_admin", {
        selectedIds,
      });
      setRows(data || []);
      if (selectedIds.includes(user.id)) {
        setAdmin(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between mx-auto">
      <div className="flex flex-col justify-center border max-w-[1400px] mx-auto  p-[15px] rounded-lg shadow-lg shadow-blue-500/50">
        <div className="flex justify-between gap-[8px]">
          <div className="">
            <Button
              color="info"
              startIcon={<LockIcon />}
              onClick={onBlock}
              disabled={!selectedIds.length}
            >
              {t("admin.block")}
            </Button>
            <Button
              color="success"
              startIcon={<LockOpenIcon />}
              onClick={onUnblock}
              disabled={!selectedIds.length}
            >
              {t("admin.unblock")}
            </Button>
            <Button
              color="error"
              startIcon={<DeleteIcon />}
              onClick={onDelete}
              disabled={!selectedIds.length}
            >
              {t("admin.delete")}
            </Button>
          </div>
          <div>
            <Button
              color="secondary"
              startIcon={<AddModeratorIcon />}
              onClick={onSetAdmin}
              disabled={!selectedIds.length}
            >
              {t("admin.set_admin")}
            </Button>
            <Button
              color="secondary"
              startIcon={<RemoveModeratorIcon />}
              onClick={onUnsetAdmin}
              disabled={!selectedIds.length}
            >
              {t("admin.unset_admin")}
            </Button>
          </div>
        </div>
        <div
          className="flex justify-center mx-auto mt-[20px]"
          style={{ width: "100%" }}
        >
          <DataGrid
            rows={rows}
            columns={UserColumnTable()}
            checkboxSelection
            slots={{
              loadingOverlay: LinearProgress,
            }}
            loading={isLoading}
            onRowSelectionModelChange={onSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
