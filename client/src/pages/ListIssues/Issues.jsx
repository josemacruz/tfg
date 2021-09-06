import { Modal } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { AddIssue } from '../../components/Modals/AddIssue';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import colors from '../../configuration/colors';
import { Profile } from '../../components/Profile';
import { useSelector } from 'react-redux';
import { getIssues, addIssue, getServices } from '../../services/redux/issues/actions';
import { TableProfile } from '../../components/TableProfile';
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
  id: 'incidencias',
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
        date: 'TimeInstant',
        humidity: 'humidity',
        id: 'id',
        temperature: 'temperature',
        type: 'type',
      },
    },
  }
};


function Issues() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const value = useSelector(state => state.get('issues').get('list').toJS());
  useEffect(() => {
    getIssues();
    getServices();
  }, []);
  console.log(value, 'oa');
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
        datas={value}
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
