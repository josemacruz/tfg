import React, { useEffect, useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { readIssues } from '../../services/redux/actions';
import CachedIcon from '@mui/icons-material/Cached';
import './index.scss';

function createColumns({ actionsProps }) {
  return [
    { field: 'id', headerName: 'ID', width: 200, headerClassName: "headerTitle" },
    { field: 'attribute', headerName: 'Atributo', width: 200, headerClassName: "headerTitle" },
    { field: 'status', headerName: 'Estado', width: 100, headerClassName: "headerTitle" },
    { field: 'action', headerName: 'Localización', width: 270, renderCell: (params) => {
      return (<span className="locationText" onClick={() => actionsProps.OnHandleOpen(params.row)}>Ver localización</span>);
    }, headerClassName: "headerTitle"},
    { field: 'description', headerName: 'Descripción', type: 'string', width: 1000, headerClassName: "headerTitle" },
  ];
}

export default function DataTable({ OnHandleOpen }) {
	const issues = useSelector((state) => state.get('redux').get('listIssues').toJS());

  const rows = useMemo(() => (
    issues?.map((issue, index) => ({
      id: issue.id,
      attribute: issue.attributes.value,
      status: issue.status.value,
      location: { long: issue.location.value.coordinates[0], lat: issue.location.value.coordinates[1] },
      description: issue.description.value,
    }))
  ), [issues]);

  const columns = React.useMemo(() => {
    return createColumns({
      actionsProps: {
        OnHandleOpen,
      }
    });
  }, [OnHandleOpen]);

  useEffect(() => {
		readIssues();
	}, [])

  return (
    <div className="tableContainer">
      <div className="tableReload" onClick={() => {
          readIssues();
        }}>
        <CachedIcon />
        <span className='reload'>Recargar alertas</span>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
}
