import { isMuiElement, Modal } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './styles.scss';
import { AddIssue } from '../../components/Modals/AddIssue';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import colors from '../../configuration/colors';
import { Profile } from '../../components/Profile';
import { useSelector } from 'react-redux';
import { getIssues, getServices } from '../../services/redux/issues/actions';
import DirectoryTable from '../../components/List';
import Pagination from '../../components/Pagination';

export const widgetConfig =  {
  id: 'incidencias',
  config: {
    appearance: {
      hidden: ['subFamily', 'orderType'],
    },
    colors: {
      headerColor: colors['ui-White'],
      headerTableBackground: colors['ui-White'],
      headerTableColorText: colors['ui-Black'],
    },
    conditions: { },
    labels: {
      alias: {
        date: 'date',
        category: 'category',
        family: 'family',
        subFamily: 'subFamily',
        orderType: 'orderType',
        description: 'description',
        status: 'status',
        criticality: 'criticality',
      },
    },
  }
};

export const widgetConfigDevice =  {
  id: 'devices',
  config: {
    appearance: {
      hidden: [],
    },
    colors: {
      headerColor: colors['severity-critical'],
      headerTableBackground: colors['severity-critical'],
      headerTableColorText: colors['ui-Black'],
    },
    conditions: { },
    labels: {
      alias: {
        date: 'TimeInstant',
        id: 'id',
        type: 'type',
        temperature: 'temperature',
        humidity: 'humidity',
      },
    },
  }
};

export const widgetConfigRules = {
  id: 'rules',
  config: {
    appearance: {
      hidden: [],
    },
    colors: {
      headerColor: colors['ui-White'],
      headerTableBackground: colors['ui-White'],
      headerTableColorText: colors['ui-Black'],
    },
    conditions: { },
    labels: {
      alias: {
        name: 'name',
        action: 'action',
      },
    },
  }
}

const getFormattedIssues = (issues, services) => {
  console.log(issues, services)
  const formattedIssues = [];
  issues.forEach((issue) => {
    const family = services.find((o) => o.name === issue.serviceCode);
    const subFamily = services.find((o) => o.name === issue.serviceName);
    const newIssue = {
      ...issue,
      family,
      subFamily,
    };
    formattedIssues.push(newIssue);
  });
  return formattedIssues;
}

function Issues() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const issues = useSelector(state => state.get('issues').get('list').toJS());
  const services = useSelector(state => state.get('issues').get('listServices').toJS());

  const formattedIssues = useMemo(() => getFormattedIssues(
    issues,
    services,
  ), [issues.length, services.length]);
  console.log('asdsad', formattedIssues)
  useEffect(() => {
    getIssues();
    getServices();
  }, []);

  const ref = useRef(null);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  });
  return (
      <div className="dashboardContainer">
       <DirectoryTable
        datas={formattedIssues}
        handleAdd={handleOpen}
       />
       <Pagination
         usersPerPage={5}
         totalUsers={100}
         paginate={() => null}
       />
        <Modal
          open={open}
          onClose={handleClose}
        >
          <div className="modalContainer">
          <AddIssue handleClose={handleClose} setOpen={setOpenAlert}/>
          </div>
        </Modal>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity="success">
            This is a success message!
          </Alert>
      </Snackbar>
      {openProfile && (
        <div ref={ref}>
          <Profile />
        </div>
      )}
    </div>
  );
}

export default Issues;
