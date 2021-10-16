import Select from 'react-select';
import { TextField } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDevices } from '../../../../services/redux/devices/actions';
import './styles.scss';
import { getServices } from '../../../../services/redux/issues/actions';
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import { injectIntl } from 'react-intl';

const replaceSymbol = (text) => {
  if (text?.indexOf('_')) return text.replace(/_/g, '-');
  return text;
};

export const getAllServices = (familyList) => {
  const family = [];
  const subFamily = [];
  const orderType = [];
  const category = [];
  const criticality = [];
  const status = [];
  const isIncluded = [];

  familyList.forEach((service) => {
    if (service.group === '') {
      if (service.name !== 'default') {
        family.push({ name: service.name, value: service.name });
      }
    } else {
      subFamily.push({ name: service.name, value: service.name });
      if (service.status) {
        service.status.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            status.push({ name: order, value: replaceSymbol(order) });
          }
        });
      }
      if (service.criticalities) {
        service.criticalities.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            criticality.push({ name: order, value: order });
          }
        });
      }
      if (service.categoryType) {
        service.categoryType.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            category.push({ name: order, value: replaceSymbol(order) });
          }
        });
      }
      if (service.issueType) {
        service.issueType.forEach((order) => {
          if (!orderType.includes(order)) {
            orderType
              .push({ name: order, value: replaceSymbol(order) });
          }
        });
      }
    }
  });
  return [family, subFamily, orderType, category, criticality, status];
};

function AddConfig(props) {
  const {
    description,
    handleOnChange,
    validate,
    error,
    close,
    family,
    subFamily,
    category,
    criticality,
    orderType,
    device,
    intl,
  } = props;
  console.log(intl)

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
  const ref = useRef(null);

  const getValue = (filter) => {
    const filters = {
      category: { value: category, label: intl.formatMessage({ id: `issue.list.${category}` }) },
      criticality: { value: criticality, label: intl.formatMessage({ id: `issue.list.${criticality}` }) },
      family: { value: family, label: intl.formatMessage({ id: `issue.list.${family}` }) },
      subFamily: { value: subFamily, label: intl.formatMessage({ id: `issue.list.${subFamily}` }) },
      orderType: { value: orderType, label: intl.formatMessage({ id: `issue.list.${orderType}` }) },
      devices: { value: device, label: device },
    };

    if (family !== '' && subFamily !== '' && orderType !== '' &&
			category !== '' && criticality !== '' && device !== '') {
         return filters[filter];
      } else {
        return '';
      }
  }

  const getOptions = (entities) => (entities?.length ? entities
    .map((o) => ({ value: o.name, label: intl.formatMessage({ id: `issue.list.${o.value}` }) })) : []);

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

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  });

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
    <div className="stepContainer" ref={ref}>
     <div className="closeIcon">
      <ClearIcon onClick={close}></ClearIcon>
      </div>
      <h1 className="title">Información general de la incidencia</h1>
      <div className="selectContainer">
        {selects.map((d) => (
          <Select
            key={d}
            className="selector"
            defaultValue={getValue(d)}
            placeholder={d}
            isSearchable
            onChange={(value, name) => handleOnChange(name.name, value.value)}
            name={d}
            options={getFilter(d)}
          />
        ))}
      </div>
      <div className="fieldContainer">
        <TextField
          id="description"
          className="textField"
          placeholder="Decripción"
          multiline
          rows={5}
          fullWidth
          margin="normal"
          value={description}
          variant="outlined"
          onChange={(event) => handleOnChange(event.target.id, event.target.value)}
        />
      </div>
      <button onClick={validate} className="addButton">Next</button>
      {error && (<div className="alertContainer">
        <Alert severity="error">Error, seleccione todos los campos</Alert>
      </div>)}
  </div>
  );
}

export default injectIntl(AddConfig)