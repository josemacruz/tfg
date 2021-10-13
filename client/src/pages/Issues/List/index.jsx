import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '../../../components/BasicList';
import { Profile } from '../Profile/index';
import './styles.scss';
import { deleteIssue, getIssues, getServices } from '../../../services/redux/issues/actions';
import { useSelector } from 'react-redux';
import { getFormattedIssues } from '../helpers';
import Add from '../Add';

function List({ intl }) {
  const [openModal, setOpenModal] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [currentRow, setCurrentRow] = useState();
  const [validate, setValidate] = useState(false);
  const issues = useSelector((state) => state.get('issues').get('list').toJS());
  const services = useSelector((state) => state.get('issues').get('listServices').toJS());

  const formattedIssues = useMemo(() => getFormattedIssues(
    issues,
    services,
  ), [JSON.stringify(issues), issues.length, services.length]);

  const data = formattedIssues.map((issue) => ({
    id: issue.id,
    family: intl.formatMessage({ id: `issue.list.${issue.family.name}` }),
    description: issue.description,
    criticality: intl.formatMessage({ id: `issue.list.${issue.criticality}` }),
    status: intl.formatMessage({ id: `issue.list.${issue.status}` }),
    dateCreated: issue.dateCreated.value,
    category: intl.formatMessage({ id: `issue.list.${issue.category}` }),
  }));

  const columns = [
    { title: intl.formatMessage({ id: 'issue.list.family' }), field: 'family' },
    { title: intl.formatMessage({ id: 'issue.list.description' }), field: 'description' },
    { title: intl.formatMessage({ id: 'issue.list.criticality' }), field: 'criticality' },
    { title: intl.formatMessage({ id: 'issue.list.status' }), field: 'status' },
    { title: intl.formatMessage({ id: 'issue.list.date' }), field: 'dateCreated', type: 'date' },
    { title: intl.formatMessage({ id: 'issue.list.category' }), field: 'category' },
    {
      title: intl.formatMessage({ id: 'issue.list.action' }),
      field: 'internal_action',
      editable: false,
      render: (rowData) => (rowData && (
        <>
          <IconButton
            color="primary"
            onClick={() => handleOpenProfile(rowData)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="primary"
            onClick={() => handleDeleteIssue(rowData)}
          >
            <Delete />
          </IconButton>
        </>
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

  const handleDeleteIssue = (rowData) => {
    const { id } = rowData;
    console.log(rowData);
    deleteIssue(id);
  }

  useEffect(() => {
    if (validate) getIssues();
  }, [validate])

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
        setValidate={setValidate}
      />
      )}
    </div>
  );
}

export default injectIntl(List);
