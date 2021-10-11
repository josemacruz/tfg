import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDevices } from '../../../../services/redux/devices/actions';
import { getServices } from '../../../../services/redux/issues/actions';
import Alert from '@mui/material/Alert';
import './styles.scss';
import { getAllServices } from '../../Add/steps/AddConfig';

export function ProfileIssue(props) {
  const {
    description,
    handleOnChange,
    validate,
    error,
    close,
  } = props;

  const [filtersValues, setFiltersValues] = useState({});
  const devices = useSelector((state) => state.get('devices').get('list').toJS());
  const services = useSelector((state) => state.get('issues').get('listServices').toJS());
  const selects = [
    'family',
    'subFamily',
    'orderType',
    'category',
    'criticality',
    'devices',
  ];

  const getOptions = (entities) => (entities?.length ? entities
    .map((o) => ({ value: o.name, label: o.value })) : []);

  const getDevice = (device) => (device?.length ? device
    .map((o) => ({ value: o.id, label: o.id })) : []);

  const getFilter = (filter) => {
    const filters = {
      category: getOptions(filtersValues.categories),
      criticality: getOptions(filtersValues.criticality),
      family: getOptions(filtersValues.family),
      subFamily: getOptions(filtersValues.subFamily),
      orderType: getOptions(filtersValues.orderType),
      status: getOptions(filtersValues.status),
      devices: getDevice(devices),
    };
    return filter ? filters[filter] : [];
  };

  useEffect(() => {
    const [
      family,
      subFamily,
      orderType,
      categories,
      criticality,
      status,
    ] = getAllServices(services);

    setFiltersValues({
      family,
      subFamily,
      orderType,
      categories,
      criticality,
      status,
    });
  }, [services.length]);

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  useEffect(() => {
    getServices();
  }, [getServices])

  return (
    <div className="stepContainer">
      <div className="selectContainer">
        {selects.map((d) => (
          <Select
            key={d}
            className="selector"
            defaultValue
            placeholder={d}
            isSearchable
            onChange={(value, name) => handleOnChange(name.name, value.value)}
            name={d}
            options={getFilter(d)}
          />
        ))}
      </div>
      {error && (<div className="alertContainer">
        <Alert severity="error">This is an error alert — check it out!</Alert>
      </div>)}
  </div>
  );
}
