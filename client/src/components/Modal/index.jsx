// Based on original Customized dialog from MUI
import React from "react";
import Button from "@material-ui/core/Button";
import MapModal from "../Map/Map";
import './index.scss';


const Modal = (props) => {

  return (
		<div className="modalContainer">
			<div className="modalMap">
				<MapModal long={props.long} lat={props.lat} />
			</div>
			<Button
				className="modalButton"
				autoFocus
				onClick={props.handleClose}
				color="secondary"
				size="large"
				variant="contained"
			>
				Cerrar
			</Button>
		</div>
  );
};

export default Modal;
