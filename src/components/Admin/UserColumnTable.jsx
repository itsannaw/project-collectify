import { getDateTime } from "../../helpers/date-utils";
import i18next from "i18next";

const UserColumnTable = () => [
  { field: "id", headerName: i18next.t("admin_table.id"), width: 50 },
  {
    field: "username",
    headerName: i18next.t("admin_table.username"),
    width: 150,
  },
  { field: "email", headerName: "Email", width: 150 },
  {
    field: "created_at",
    headerName: "Registration",
    width: 180,
    renderCell: (params) => <>{getDateTime(params.value)}</>,
  },
  {
    field: "updated_at",
    headerName: "Login",
    width: 180,
    renderCell: (params) => (
      <>{params.value ? getDateTime(params.value) : "Was not logged yet"}</>
    ),
  },
  {
    field: "blocked",
    headerName: "Status",
    width: 140,
    renderCell: (params) => (
      <>
        {params.value ? (
          <span className="text-red-700">Blocked</span>
        ) : (
          <span className="text-green-700">Not blocked</span>
        )}
      </>
    ),
  },
  {
    field: "admin",
    headerName: "Admin",
    width: 100,
    renderCell: (params) => (
      <>
        {params.value ? (
          <span className="text-green-700">Yes</span>
        ) : (
          <span className="text-red-700">No</span>
        )}
      </>
    ),
  },
];

export default UserColumnTable;
