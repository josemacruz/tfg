import { Modal } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Widget from '../../components/Widget';
import './styles.scss';
import { AddIssue } from '../../components/Modals/AddIssue';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import colors from '../../configuration/colors';
import { Profile } from '../../components/Profile';
import { useSelector } from 'react-redux';
import { getIssues, addIssue } from '../../services/redux/issues/actions';
import { TableProfile } from '../../components/TableProfile';

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

function Widgets() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openTableProfile, setOpenTableProfile]= useState(false);
  const value = useSelector(state => state.get('issues').get('list').toJS());
  useEffect(() => {
    getIssues();
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

  const handleOpenTableProfile = () => {
    setOpenTableProfile(true);
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenProfile(false);
      setOpenTableProfile(false);
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
        <Widget
          title="Listado de incidencias"
          handleProfile={handleOpenTableProfile}
          handleAdd={handleOpen}
          addButton="Añadir incidencia"
          data={value}
          config={widgetConfig.config}
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
      {openTableProfile && (
        <div ref={ref}>
          <TableProfile />
        </div>
      )}
    </div>
  );
}

export default Widgets;
