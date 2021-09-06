import StepComponent from "../../Stepper";
import React, { useEffect, useState } from "react";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import './styles.scss';
import { addIssue } from "../../../services/redux/issues/actions";

export function AddIssue({ handleClose, setOpen }) {
	const [activeStep, setActiveStep] = useState(0);
	const steps = ["Añadir incidencia", "Información general"];
	const [description, setDescription] = useState();
	const [family, setFamily] = useState('');
	const [subFamily, setSubFamily] = useState('');
	const [orderType, setOrderType] = useState('');
	const [category, setCategory] = useState('');
	const [criticality, setCriticality] = useState('');
	const [device, setDevice] = useState('');

	const handleOnChange = (name, value) => {
		switch(name) {
			case 'description':
				setDescription(value);
				break;
			case 'family':
				setFamily(value);
				break;
			case 'subFamily':
				setSubFamily(value);
				break;
			case 'orderType':
				setOrderType(value);
				break;
			case 'category':
				setCategory(value);
				break;
			case 'criticality':
				setCriticality(value);
				break;
			case 'device':
				setDevice(value);
				break;
			default:
				break;
		}
	};

	const sendIssue = () => {
		const id = Math.floor(Math.random() * 999999);
		const newIssue = {
			"id": `service-request:${id}`,
			"type": "Open311ServiceRequest",
			"status": {
				"type": "Property",
				"value": "open"
			},
			"description": {
					"value": description,
			},
			"service_code": {
					"value": family
			},
			"service_name": {
					"value": subFamily
			},
			"attributes": {
					"value": {
							"issue-type": [orderType],
							"category-type": [category],
							"criticality": [criticality],
							"relationed-device": [device]
					}
			},
		};
		console.log('newIssues', newIssue)
		addIssue(newIssue);
	}

	return (
		<StepComponent 
			closeModal={handleClose}
			steps={steps}
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			setOpen={setOpen}
			sendIssue={sendIssue}
		>
		{activeStep === 0 ? (
			<Step1
			handleOnChange={handleOnChange}
			/>
		) : (
			<Step2
				description={description}
				family={family}
				subFamily={subFamily}
				orderType={orderType}
				category={category}
				criticality={criticality}
				device={device}
				handleOnChange={handleOnChange}
			/>
		)}
		</StepComponent>
	);
};