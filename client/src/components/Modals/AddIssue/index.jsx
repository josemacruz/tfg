import StepComponent from "../../Stepper";
import React, { useState } from "react";
import { Step1 } from "./steps/step1";
import { Step2 } from "./steps/step2";
import './styles.scss';

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
			case 'device':
				setDevice(value);
				break;
			default:
				break;
		}
	};

	return (
		<StepComponent 
			closeModal={handleClose}
			steps={steps}
			activeStep={activeStep}
			setActiveStep={setActiveStep}
			setOpen={setOpen}
		>
		{activeStep === 0 ? (
			<Step1
			description={description}
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