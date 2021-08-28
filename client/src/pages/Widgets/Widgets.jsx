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

const widgetConfig =  {
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

const data = [
  {
    "id": "service-request:638344",
    "status": "closed",
    "description": "Acera en mal estado con bordillo partido en dos",
    "family": "Alumbrado",
    "subFamily": "Luminaria",
    "dateCreated": "2010-04-14T06:37:38-08:00",
    "orderType": "Bordillo",
    "category": "Otros",
    "criticality": "low",     
  },
  {
    "id": "service-request:638344",
    "status": "closed",
    "description": "Acera en mal estado con bordillo partido en dos",
    "family": "Alumbrado",
    "subFamily": "Luminaria",
    "dateCreated": "2010-04-14T06:37:38-08:00",
    "orderType": "Bordillo",
    "category": "Otros",
    "criticality": "low",     
  },
  {
    "id": "service-request:638344",
    "status": "closed",
    "description": "Acera en mal estado con bordillo partido en dos",
    "family": "Alumbrado",
    "subFamily": "Luminaria",
    "dateCreated": "2010-04-14T06:37:38-08:00",
    "orderType": "Bordillo",
    "category": "Otros",
    "criticality": "high",     
  },
  {
    "id": "service-request:638344",
    "status": "closed",
    "description": "Acera en mal estado con bordillo partido en dos",
    "family": "Alumbrado",
    "subFamily": "Luminaria",
    "dateCreated": "2010-04-14T06:37:38-08:00",
    "orderType": "Bordillo",
    "category": "Otros",
    "criticality": "medium",     
  },
];

function Widgets() {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const value = useSelector(state => state.get('issues').get('list').toJS());
  useEffect(() => {
    getIssues();
  }, []);
  console.log(value)
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
        <Widget
          title="Listado de incidencias"
          handleProfile={handleOpenProfile}
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
    </div>
  );
}

export default Widgets;
