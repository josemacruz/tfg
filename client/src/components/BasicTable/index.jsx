/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useMemo, useState } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import formatClassname from './utils';
import './styles.scss';
import { SetLeftFeature } from 'ag-grid-community';

function BasicTable(props) {
  const {
    config,
  } = props;

  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    var cols = params.columnApi.getAllColumns();
    cols.forEach(function (col) {
      var colDef = col.getUserProvidedColDef();
  
    });
  };

  // * --------------------- [STATE] --------------------- * //
  const createRowData = () => {
    var data = [];
    for (var i = 0; i < 20; i++) {
      data.push({
        height: Math.floor(Math.random() * 100),
        width: Math.floor(Math.random() * 100),
        depth: Math.floor(Math.random() * 100),
      });
    }
    return data;
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
           rowData={createRowData()}
           onGridReady={onGridReady}
           defaultColDef={{
              flex: 1,
              minWidth: 90,
              resizable: true,
              sortable: true,
            }}
            pagination={true}
            paginationAutoPageSize={true}
            suppressAggFuncInHeader={true}
            animateRows={true}
           >
            <AgGridColumn headerName="Col 1" colId="firstCol" field="height" />
            <AgGridColumn headerName="Col 2" colId="firstCol" field="height" />
            <AgGridColumn headerName="Col 3" field="height" />
            <AgGridColumn headerName="Col 4" field="height" />
            <AgGridColumn headerName="Col 5" valueGetter="data.width" />
            <AgGridColumn headerName="Col 6" valueGetter="data.width" />
          </AgGridReact>
    </div>
  );
}

export default BasicTable;
