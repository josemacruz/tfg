
import React, { useEffect, useRef, useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './styles.scss'
import { VscChromeClose } from 'react-icons/vsc';
import { Button, TextField, Select } from '@material-ui/core';

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

export default function StepProgress(props) {
	const [activeStep, setActiveStep] = useState(1);
	const steps = getSteps();
	const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

	const ref = useRef(null);
	const handleClickOutside = (event) => {
		console.log(event.target)
			if (ref.current && !ref.current.contains(event.target)) {
					props.closeModal();
			}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
				document.removeEventListener('click', handleClickOutside, true);
		};
});

  return (
		<div className="stepContainer" ref={ref}>
			<div className="stepHeader">
				<VscChromeClose className="closeButton" onClick={props.closeModal} />
				<Stepper alternativeLabel activeStep={activeStep}>
					{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
				</Stepper>
			</div>
			<div className="stepContents">
				{/* 
					TODO: Crear formularios
				<TextField id="outlined-basic" label="Outlined" variant="outlined" />
				<Select
          multiple
       /> */}
			</div>
			<div className="stepFooter">
				<div>
					<Button disabled={activeStep === 0} onClick={handleBack}>
						Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
					>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</div>
			</div>
		</div>
  );
}