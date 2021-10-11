import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Edit from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Table from '../../../components/BasicList';
import { Profile } from '../Profile/index';
import './styles.scss';
import { getIssues, getServices } from '../../../services/redux/issues/actions';
import { useSelector } from 'react-redux';
import { getFormattedIssues } from '../helpers';
import Add from '../Add';

function List() {
  const [openModal, setOpenModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const issues = useSelector((state) => state.get('issues').get('list').toJS());
  const services = useSelector((state) => state.get('issues').get('listServices').toJS());
  const ref = useRef(null);

  const formattedIssues = useMemo(() => getFormattedIssues(
    issues,
    services,
  ), [issues.length, services.length]);

  const data = formattedIssues.map((issue) => ({
    id: issue.id,
    family: issue.family.name,
    description: issue.description,
    criticality: issue.criticality,
    status: issue.status,
    dateCreated: issue.dateCreated.value,
    category: issue.category,
  }));

  const columns = [
    { title: 'Familia', field: 'family' },
    { title: 'Descripción', field: 'description' },
    { title: 'Criticidad', field: 'criticality' },
    { title: 'Estado', field: 'status' },
    { title: 'Fecha', field: 'dateCreated' },
    { title: 'Categoría', field: 'category' },
    {
      title: 'Acciones',
      field: 'internal_action',
      editable: false,
      render: (rowData) => (rowData && (
        <IconButton
          color="primary"
          onClick={() => handleOpenProfile(rowData)}
        >
          <Edit />
        </IconButton>
      )),
    },
  ];

  const handleAddIssue = () => {
    setOpenModal(!openModal);
  }

  const handleOpenProfile = (rowData) => {
    setOpenProfile(!openProfile);
    setCurrentRow(rowData.id);
  }

  useEffect(() => {
    getIssues();
  }, [getIssues])

  useEffect(() => {
    getServices();
  }, [getServices])

  return (
    <div className="container">
      <div className="listHeader">
        <span className="listTitle">
          <FormattedMessage id="issues.list.title" />
        </span>
        <button type="button" className="button" onClick={handleAddIssue}>Add issue</button>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
        <Add
          open={openModal}
          close={handleAddIssue}
        />
      {openProfile && (
      <Profile
        setOpenProfile={setOpenProfile}
        close={handleOpenProfile}
        currentRow={currentRow}
      />
      )}
    </div>
  );
}

export default List;
