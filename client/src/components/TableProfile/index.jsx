import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";
import React from "react";
import ColorPicker from '../ColorPicker';
import './styles.scss';

export function TableProfile(params) {
	return (
		<div className="profileContainer">
			<div className="profileHeader">
				<h1>HEADER</h1>
			</div>
			<div className="profileContents">
				<Accordion>
					<AccordionSummary>Expansion 1</AccordionSummary>
					<AccordionDetails>
						<ColorPicker />
					</AccordionDetails>
				</Accordion>
			</div>
			<div className="profileFooter">
				<button>Aplicar Cambios</button>
			</div>
		</div>
	);
}