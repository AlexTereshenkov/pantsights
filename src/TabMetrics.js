import { DataGrid } from "@mui/x-data-grid";
import Metrics from "../server/resources/metrics.json";

const columns = [
  // { field: 'id', headerName: 'id', width: 130 },
  { field: "file", headerName: "File", width: 800 },
  {
    field: "dependencies",
    headerName: "Dependencies (direct)",
    width: 160,
    type: "number",
  },
  {
    field: "dependencies_transitive",
    headerName: "Dependencies (transitive)",
    width: 160,
    type: "number",
  },
  {
    field: "dependencies_direct_transitive_ratio",
    headerName: "Dependencies ratio",
    width: 190,
    type: "number",
  },
  {
    field: "dependees",
    headerName: "Dependees (direct)",
    width: 130,
    type: "number",
  },
  {
    field: "dependees_transitive",
    headerName: "Dependees (transitive)",
    width: 130,
    type: "number",
  },
  {
    field: "dependees_direct_transitive_ratio",
    headerName: "Dependees ratio",
    width: 190,
    type: "number",
  },
  {
    field: "average_neighbor_degree",
    headerName: "Average neighbor degree",
    width: 130,
    type: "number",
  },
  {
    field: "loc",
    headerName: "Lines count",
    width: 130,
    type: "number",
  },
  {
    field: "git_edits_count",
    headerName: "Git commits (6 months)",
    width: 190,
    type: "number",
  },
];

// making the table header multiline https://github.com/mui/mui-x/issues/898

export default function TabMetrics() {
  return (
    <div style={{ height: 1000, width: "100%" }}>
      <DataGrid
        rows={Metrics}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        showCellVerticalBorder={true}
        showColumnVerticalBorder={true}
        sx={{
          "& .MuiDataGrid-columnHeaderTitle": {
            textOverflow: "clip",
            whiteSpace: "break-spaces",
            lineHeight: 1,
          },
        }}
      />
    </div>
  );
}
