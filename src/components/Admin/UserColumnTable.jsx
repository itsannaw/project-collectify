import { getDateTime } from "../../helpers/date-utils";
import i18next from "i18next";

const UserColumnTable = () => [
  { field: "id", headerName: i18next.t("admin_table.id"), width: 50 },
  {
    field: "username",
    headerName: i18next.t("admin_table.username"),
    width: 150,
  },
  { field: "email", headerName: i18next.t("admin_table.email"), width: 150 },
  {
    field: "created_at",
    headerName: i18next.t("admin_table.reg"),
    width: 180,
    renderCell: (params) => <>{getDateTime(params.value)}</>,
  },
  {
    field: "updated_at",
    headerName: i18next.t("admin_table.log"),
    width: 180,
    renderCell: (params) => (
      <>{params.value ? getDateTime(params.value) : "Was not logged yet"}</>
    ),
  },
  {
    field: "blocked",
    headerName: i18next.t("admin_table.status"),
    width: 140,
    renderCell: (params) => (
      <>
        {params.value ? (
          <span className="text-red-700">
            {i18next.t("admin_table.blocked")}
          </span>
        ) : (
          <span className="text-green-700">
            {i18next.t("admin_table.not_blocked")}
          </span>
        )}
      </>
    ),
  },
  {
    field: "admin",
    headerName: i18next.t("admin_table.adm"),
    width: 100,
    renderCell: (params) => (
      <>
        {params.value ? (
          <span className="text-green-700">{i18next.t("admin_table.y")}</span>
        ) : (
          <span className="text-red-700">{i18next.t("admin_table.n")}</span>
        )}
      </>
    ),
  },
];

export default UserColumnTable;
