import { DataGrid } from "@mui/x-data-grid";

const FavouriteTable = () => {
  const columns = [
    { field: "title", headerName: "Title", width: 70 },
    { field: "firstName", headerName: "", width: 130 },
    { field: "score", headerName: "Score", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  const rows = [{ id: 1, lastName: "Snow", firstName: "Jon" }];

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default FavouriteTable;
