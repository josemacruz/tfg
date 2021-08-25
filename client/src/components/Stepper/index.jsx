
import React, { useEffect, useRef, useState } from 'react'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './styles.scss'
import { VscChromeClose } from 'react-icons/vsc';
import { Button } from '@material-ui/core';

export default function StepComponent(props) {

	const {
		steps,
		closeModal,
		children,
		activeStep,
		setActiveStep,
		setOpen,
	} = props;

	const ref = useRef(null);
	const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
	const handleClickOutside = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
					closeModal();
			}
	};
	
	const handleFinish = () => {
		setOpen(true);
		closeModal()
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
				document.removeEventListener('click', handleClickOutside, true);
		};
	});

  return (
		<div className="stepContainer" ref={ref}>
			<div className="stepHeader">
				<VscChromeClose className="closeButton" onClick={closeModal} />
				<Stepper alternativeLabel activeStep={activeStep} classe>
					{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
				</Stepper>
			</div>
			<div className="stepContents">
				{children}
			</div>
			<div className="stepFooter">
				<div>
				{activeStep === steps.length ? (
          <div>
            <Button onClick={handleFinish}>
							Finish
            </Button>
          </div>
        ) : (
          <div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          </div>
        )}
				</div>
			</div>
		</div>
  );
}