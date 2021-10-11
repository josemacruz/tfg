import React, { useEffect, useRef, useState } from 'react';
import { ProfileIssue } from './sections';
import { Tabs, Tab } from '@mui/material';
import './styles.scss';
import { TabPanel } from '../../../components/Tabs';
import { useSelector } from 'react-redux';
import { get } from 'immutable';
import { getIssue } from '../../../services/redux/issues/actions';

export function Profile({ setOpenProfile, currentRow, close }) {
  const [description, setDescription] = useState();
  const [family, setFamily] = useState('');
  const [subFamily, setSubFamily] = useState('');
  const [orderType, setOrderType] = useState('');
  const [category, setCategory] = useState('');
  const [criticality, setCriticality] = useState('');
  const [device, setDevice] = useState('');
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  console.log(currentRow);

  const issue = useSelector((state) => get('issues').get('currentIssue'));

  const handleOnChange = (name, value) => {
    console.log(name, value)
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
        //updateIssue 
        //https://fiware-orion.readthedocs.io/en/1.4.0/user/walkthrough_apiv2/index.html#update-entity
			} else {
				setError(true);
			}
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  const a11yProps = (index) => ({
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  useEffect(() => {
    if (currentRow) {
      getIssue({ id: currentRow });
    }
  }, [getIssue, currentRow]);

  return (
    <div className="profileContainer" ref={ref}>
      <div className="profileHeader">
        <h2>Incidencia</h2>
        <span className="issueDate">Creado: {currentRow}</span>
      </div>
      <div className="descriptionSection">
        <h3>Descripción</h3>
        <p id="decription" name="description" contentEditable className="editable" onChange={(event) => handleOnChange(event.target.value)}/>
      </div>
      <div className="profileContents">
        <Tabs value={value} aria-label="basic tabs example">
          <Tab label="Información" {...a11yProps(0)}  />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileIssue/>
        </TabPanel>
      </div>
      <div className="profileFooter">
        <button type="button" className="button">Aplicar Cambios</button>
      </div>
    </div>
  );
}
