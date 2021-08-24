
import React, { useEffect, useRef, useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './styles.scss'
import { VscChromeClose } from 'react-icons/vsc';
import { Button, Typography } from '@material-ui/core';

function getSteps() {
  return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
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
				<span>cosas</span>
			</div>
			<div className="stepFooter">
				<Typography className>{getStepContent(activeStep)}</Typography>
				<div>
					<Button disabled={activeStep === 0} onClick={handleBack} className>
						Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleNext}
						className
					>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</div>
			</div>
		</div>
  );
}