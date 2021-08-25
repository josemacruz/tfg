import Select from 'react-select';
import { TextField } from '@material-ui/core';
import React, { useState } from 'react';

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
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	]
	const selects = [
		'family',
		'subfamily',
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
						options={options}
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
