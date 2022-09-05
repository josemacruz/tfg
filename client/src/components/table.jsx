import React, { useEffect, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { readIssues } from '../services/redux/actions';

const columns = [
  { field: 'id', headerName: 'Atributo', width: 200 },
  { field: 'status', headerName: 'Estado', width: 100 },
  { field: 'location', headerName: 'Localización', width: 300 },
  { field: 'description', headerName: 'Descripción', type: 'string', width: 1000 },
];

export default function DataTable() {
	const issues = useSelector((state) => state.get('redux').get('listIssues').toJS());

  const rows = useMemo(() => (
    issues?.map((issue) => ({
      id: issue.attributes.value,
      status: issue.status.value,
      location: `${issue.location.value.coordinates[0]}, ${issue.location.value.coordinates[1]}`,
      description: issue.description.value,
    }))
  ), [issues]);

  useEffect(() => {
		readIssues();
		setInterval(() => {
			readIssues();
		}, [15000])
	}, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
