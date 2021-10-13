/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Moment from 'react-moment';
import CustomModal from '../../../components/Modal';
import { addIssue } from '../../../services/redux/issues/actions';
import { AddConfig } from './steps/AddConfig';

function Add({ open, close }) {
  const [description, setDescription] = useState();
  const [family, setFamily] = useState('');
  const [subFamily, setSubFamily] = useState('');
  const [orderType, setOrderType] = useState('');
  const [category, setCategory] = useState('');
  const [criticality, setCriticality] = useState('');
  const [device, setDevice] = useState('');
  const [error, setError] = useState(false);

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

  const validate = () => {
		setError(false);
		if (family !== '' && subFamily !== '' && orderType !== '' &&
			category !== '' && criticality !== '' && device !== '') {
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
      <AddConfig
        description={description}
        handleOnChange={handleOnChange}
				validate={validate}
				error={error}
        close={close}
      />
    </CustomModal>
  );
}

export default Add;
