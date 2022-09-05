import React from "react";
import DataTable from "../components/table";
import WidgetsContainer from "../components/widgetsContainer";
import './Dashboard.scss';

function Dashboard() {
	return(
		<div className="dashboard">
			<div className="header">
				<span>TFG - Sistema de Alertas automáticas basado en FIWARE</span>
				<span>José M. Cruz Muñoz</span>
			</div>
			<div className="body">
				<div className="table">
					<DataTable />
				</div>
				<WidgetsContainer />
			</div>
		</div>
	);
}

export default Dashboard;
