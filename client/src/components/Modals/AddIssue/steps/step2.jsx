import Select from 'react-select';
import { TextField } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

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
          if (!orderType.includes(order)) orderType.push({ name: order, value: replaceSymbol(order) });
        });
      }
    }
	});
	console.log([family, subFamily, orderType, category, criticality, status])
  return [family, subFamily, orderType, category, criticality, status];
};

export function Step2(props) {
	const {
		family,
		subFamily,
		orderType,
		category,
		criticality,
		device,
		description,
		handleOnChange,
	} = props;
	const [filtersValues, setFiltersValues] = useState({});
	const services = useSelector((state) => state.get('issues').get('listServices'));
	const getOptions = (entities) => (entities?.length ? entities
    .map((o) => ({ value: o.name, label: o.value })) : []);
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
		}, [services]);
  const getFilter = (filter) => {
		console.log(filter, filtersValues)
    const filters = {
      category: getOptions(filtersValues.categories),
      criticality: getOptions(filtersValues.criticality),
      family: getOptions(filtersValues.family),
      subFamily: getOptions(filtersValues.subFamily),
      orderType: getOptions(filtersValues.orderType),
      status: getOptions(filtersValues.status),
    };
		console.log(filters[filter])
    return filter ? filters[filter] : [];
  };

	const selects = [
		'family',
		'subFamily',
		'orderType',
		'category',
		'criticality',
		'device',
	];
	return (
		<div className="stepContainer">
			<h1 className="title">Información general de la incidencia</h1>
			<div className="selectContainer">
			{selects.map((d) => (
				<Select
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
		</div>
	);

}
