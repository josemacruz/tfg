import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import Widget from '../../components/Widget';
import './styles.scss';
import { AddIssue } from '../../components/Modals/AddIssue';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

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
