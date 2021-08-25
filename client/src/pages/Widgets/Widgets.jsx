import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import Widget from '../../components/Widget';
import './styles.scss';
import { AddIssue } from '../../components/Modals/AddIssue';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import colors from '../../configuration/colors';

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
  return (
    <div className="dashboardContainer">
        <Widget
          title="Listado de incidencias"
          handleProfile
          handleAdd={handleOpen}
          addButton="Añadir incidencia"
          data={data}
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
    </div>
  );
}

export default Widgets;

