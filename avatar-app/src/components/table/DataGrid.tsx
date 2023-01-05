import {
  DataGrid as MuiDataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

interface IDataGrid {
  rows: any[];
  columns: GridColDef[];
  rowsPerPageOptions?: number[];
  checkboxSelection?: boolean;
  initialState?: GridInitialStateCommunity;
}

export default function DataGrid({
  columns,
  rows,
  rowsPerPageOptions = [100, 150, 200],
  initialState,
  ...others
}: IDataGrid) {
  return (
    <div style={{ height: 420 }}>
      <MuiDataGrid
        initialState={initialState}
        rows={rows}
        columns={columns}
        getRowId={() => Math.random()}
        rowsPerPageOptions={rowsPerPageOptions}
        components={{ Toolbar: GridToolbar }}
        {...others}
      />
    </div>
  );
}
