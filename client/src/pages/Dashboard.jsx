import React, { useState } from "react";
import DataTable from "../components/Table/index";
import WidgetsContainer from "../components/Widgets/widgetsContainer";
import './Dashboard.scss';
import Modal from "../components/Modal";

function Dashboard() {
	const [open, setOpen] = useState(false);
	const [long, setLong] = useState();
	const [lat, setLat] = useState();

  const OnHandleOpen = (row) => {
		setLong(row.location.long);
		setLat(row.location.lat);
    setOpen(true);
  };

  const OnHandleClose = () => {
    setOpen(false);
  };
	return(
		<div className="dashboard">
			<div className="header">
				<span>TFG - Sistema de Alertas automáticas basado en FIWARE</span>
				<span>José M. Cruz Muñoz</span>
			</div>
			<div className="body">
				<div className="table">
					<DataTable OnHandleOpen={OnHandleOpen} />
				</div>
				<WidgetsContainer />
			</div>
      {open && (<Modal handleClose={OnHandleClose} long={long} lat={lat} />)}
		</div>
	);
}

export default Dashboard;
