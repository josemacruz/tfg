/* eslint-disable no-unused-vars */
import { useState } from 'react';
import CustomModal from '../../../components/Modal';
import { addIssue } from '../../../services/redux/issues/actions';
import AddConfig from './steps/AddConfig';
import { AddPosition } from './steps/AddPosition';

function Add({ open, close, ...rest }) {
  const [description, setDescription] = useState('');
  const [family, setFamily] = useState('');
  const [subFamily, setSubFamily] = useState('');
  const [orderType, setOrderType] = useState('');
  const [category, setCategory] = useState('');
  const [criticality, setCriticality] = useState('');
  const [position, setPosition] = useState({});
  const [device, setDevice] = useState('');
  const [error, setError] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleOnChange = (name, value) => {
    switch (name) {
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
      case 'devices':
        setDevice(value);
        break;
      default:
        break;
    }
  };

  const handleChangePostion = (value) => {
    setPosition(value);
  }

  const nextStep = () => {
    if (family !== '' && subFamily !== '' && orderType !== '' &&
    category !== '' && criticality !== '' && device !== '') {
      setCurrentStep(currentStep + 1);
    }
  }

  const previousStep = () => {
    setCurrentStep(currentStep - 1);
  }

  const validate = () => {
		setError(false);
		if (position !== '') {
				const id = Math.floor(Math.random() * 999999);
				const dateCreated = new Date();
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
					"dateCreated": {
						"value": dateCreated,
					},
          "location": {
            "type": 'geo:json',
            "value": {
              "type": 'Point',
              "coordinates": [position.latitude, position.longitude],
            }
          }
				};
				addIssue(newIssue);
        close();
			} else {
				setError(true);
			}
  };

  return (
    <CustomModal
      open={open}
      onClose={close}
    >
     {currentStep === 0 ? (
       <AddConfig
        description={description}
        family={family}
        subFamily={subFamily}
        category={category}
        criticality={criticality}
        orderType={orderType}
        device={device}
        handleOnChange={handleOnChange}
				validate={nextStep}
				error={error}
        close={close}
      />
      ) : (
        <AddPosition
          handleChangePostion={handleChangePostion}
          validate={validate}
          previousStep={previousStep}
          close={close}
          error={error}
          position={position}
        />
      )}
    </CustomModal>
  );
}

export default Add;
