import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import formatClassname from './utils';
import getColumnDefs from './dataParsers';
import { ClientSideRowModelSteps } from 'ag-grid-community';
import selectableFilter from './customFilters/selectableFilter/selectableFilter';
import simpleFilter from './customFilters/simpleFilter/simpleFilter';
import './styles.scss';

function BasicTable(props) {
  const {
    config, rowsData, columnsData,
  } = props;
  console.log('BasicTable', props);

  const columnDefs = useMemo(() => getColumnDefs(columnsData), [columnsData]);
  const rowData = useMemo(() => rowsData, [rowsData]);

// * --------------------- [STATE] --------------------- * //
  const [modules] = useState([ClientSideRowModelSteps]);
  const [frameworkComponent] = useState({ simpleFilter, selectableFilter});
  const [defaultColDef] = useState({
    flex: 1,
    minWidth: 100,
    resizable: true,
  })
  const [gridApi, setGridApi] = useState(null);
  // * --------------------- [STATE] --------------------- * //

   // * --------------------- [EVENT HANDLING] --------------------- * //
   const onGridReady = (params) => {
    if (params.api) {
      setGridApi(params.api);
    }
  };
  // * --------------------- [EVENT HANDLING] --------------------- * //

  // * --------------------- [LIFECYCLE EFFECTS] --------------------- * //
  const classTableHeaderColor = useMemo(() => formatClassname(
    config?.colors?.headerTableBackground, 'COLOR',
  ), [config]);
  const classTableHeaderTextColor = useMemo(() => formatClassname(
    config?.colors?.headerTableColorText, 'TEXT',
  ), [config]);

  return (
    <div
    className={`ag-react-container ag-theme-alpine ${classTableHeaderColor} ${classTableHeaderTextColor}`}
    style={{ height: '100%', width: '100%', 'padding-left': '10px' }}
  >
      <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableSorting
          frameworkComponents={frameworkComponent}
          modules={modules}
          onGridReady={onGridReady}
          pagination
          paginationAutoPageSize
          rowSelection="multiple"
          suppressPaginationPanel
          suppressRowClickSelection
          components
        />
    </div>
  );
}

export default BasicTable;
