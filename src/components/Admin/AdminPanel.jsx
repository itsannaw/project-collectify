import { Button, LinearProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import api from "../../api/http";
import UserColumnTable from "./UserColumnTable";

const AdminPanel = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

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

  return (
    <div className="flex flex-col justify-between mx-auto">
      <div className="flex flex-col justify-center border max-w-[1400px] mx-auto  p-[15px] rounded-lg shadow-lg shadow-blue-500/50">
        <div className="flex justify-end gap-[8px]">
          <Button
            color="info"
            startIcon={<LockIcon />}
            onClick={onBlock}
            disabled={!selectedIds.length}
          >
            Block
          </Button>
          <Button
            color="success"
            startIcon={<LockOpenIcon />}
            onClick={onUnblock}
            disabled={!selectedIds.length}
          >
            Unblock
          </Button>
          <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDelete}
            disabled={!selectedIds.length}
          >
            Delete
          </Button>
        </div>
        <div
          className="flex justify-center mx-auto mt-[20px]"
          style={{ width: "100%" }}
        >
          <DataGrid
            rows={rows}
            columns={UserColumnTable}
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
