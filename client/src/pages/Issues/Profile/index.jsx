import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProfileIssue from './sections';
import { Tabs, Tab } from '@mui/material';
import { TabPanel } from '../../../components/Tabs';
import { useSelector } from 'react-redux';
import { clearIssue, getIssue, getIssues, getServices, updateIssue } from '../../../services/redux/issues/actions';
import { getFormattedIssues } from '../helpers';
import { Textarea } from '@nextui-org/react';
import './styles.scss';

export function Profile({ setOpenProfile, currentRow, close, setValidate }) {
  const [description, setDescription] = useState();
  const [family, setFamily] = useState('');
  const [subFamily, setSubFamily] = useState('');
  const [orderType, setOrderType] = useState('');
  const [category, setCategory] = useState('');
  const [criticality, setCriticality] = useState('');
  const [device, setDevice] = useState('');
  const [status, setStatus] = useState('');
  const [dateCreated,setDateCreated] = useState('');
  const [error, setError] = useState(false);
  const [issueFormatted,setIssueFormatted]= useState('');
  const [value] = useState(0);
  const [values, setValues] = useState({});
  const ref = useRef(null);

  const issue = useSelector((state) => state.get('issues').get('currentIssue').toJS());
  const services = useSelector((state) => state.get('issues').get('listServices').toJS());

  const formattedIssues = useMemo(() => getFormattedIssues(
    issue,
    services,
  ), [issue.length, services.length]);

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
      case 'status':
        setStatus(status);
        break;
      default:
        break;
    }
  };

  const validate = () => {
		setError(false);
		if (family !== '' && subFamily !== '' && orderType !== '' &&
			category !== '' && criticality !== '' && device !== '') {
				const newIssue = {
					"status": {
						"value": status,
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
							},
					},
          "dateCreated": {
						"value": dateCreated,
					},
				};
        updateIssue({ id: issueFormatted.id, body: newIssue });
        setValidate(true);
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
    if (formattedIssues.length) {
      const issueFormatted = formattedIssues[0];
      setDescription(issueFormatted.description);
      setFamily(issueFormatted.family.name);
      setSubFamily(issueFormatted.subFamily.name);
      setOrderType(issueFormatted.orderType);
      setCategory(issueFormatted.category);
      setCriticality(issueFormatted.criticality);
      setDevice(issueFormatted.devices);
      setDateCreated(issueFormatted.dateCreated.value);
      setIssueFormatted(issueFormatted);
      setStatus(issueFormatted.status);
      setValues({
        family: issueFormatted.family.name,
        subFamily: issueFormatted.subFamily.name,
        orderType: issueFormatted.orderType,
        category: issueFormatted.category,
        criticality: issueFormatted.criticality,
        devices: issueFormatted.devices,
        status: issueFormatted.status,
      })
    }
  }, [formattedIssues.length]);

  useEffect(() => {
      setValues({
        family, subFamily, orderType, category, criticality, devices: device, status,
      });
  }, [family, subFamily, orderType, category, criticality, device, status]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  useEffect(() => {
    clearIssue();
  }, [clearIssue]);

  useEffect(() => {
    if (currentRow) {
      getIssue({ id: currentRow });
    }
  }, [getIssue, currentRow]);

  return (
    <div className="profileContainer" ref={ref}>
      <div className="profileHeader">
        <h2>Incidencia</h2>
        <span className="issueDate">Creado: {dateCreated}</span>
      </div>
      <div className="descriptionSection">
        <h3>Descripción</h3>
        <Textarea
          className="descriptionArea"
          value={description}
          onChange={(event) => handleOnChange('description', event.target.value)}
        />
      </div>
      <div className="profileContents">
        <Tabs value={value} aria-label="basic tabs example">
          <Tab label="Información" {...a11yProps(0)}  />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfileIssue
            values={values}
            handleOnChange={handleOnChange}
            validate={validate}
            error={error}
          />
        </TabPanel>
      </div>
      <div className="profileFooter">
        <button type="button" className="button" onClick={validate}>Aplicar Cambios</button>
      </div>
    </div>
  );
}
