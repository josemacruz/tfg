import { Modal } from '@material-ui/core';
import React, { useState } from 'react';
import StepProgress from '../../components/StepProgress';
import Widget from '../../components/Widget';
import './styles.scss';

function Widgets() {
  //const [isOpen, open, close] = useModal();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            <StepProgress closeModal={handleClose} />
          </div>
        </Modal>
    </div>
  );
}

export default Widgets;
