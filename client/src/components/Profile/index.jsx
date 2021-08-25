import React from "react";
import { Step2 } from "../Modals/AddIssue/steps/step2";
import './styles.scss';

export function Profile(params) {
	return (
		<div className="profileContainer">
			<div className="profileHeader">
				<h1>HEADER</h1>
			</div>
			<div className="profileContents">
				<Step2 />
			</div>
			<div className="profileFooter">
				<button>Aplicar Cambios</button>
			</div>
		</div>
	);
}