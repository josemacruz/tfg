import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Switch from '@mui/material/Switch';
import './styles.scss';

const HeaderSwitch = ({intl, config, updateHeader}) => {

	const [hidden, setHidden] = useState(config.appearance.hidden ?? []);
	const [checked, setChecked] = useState({});

	const handleChange = (value, name) => {
		const newHidden = [...hidden];
		if (value && newHidden.includes(name)) {
			const index = newHidden.findIndex((o) => (o === name) );
			newHidden.splice(index, 1);
		} else if (!value && !newHidden.includes(name)) {
			newHidden.push(name);
		}
		setHidden(newHidden);
	}

	useEffect(() => {
		const checkedObj = {
			date: !hidden.includes('date'),
			category: !hidden.includes('category'),
			family: !hidden.includes('family'),
			subFamily: !hidden.includes('subFamily'),
			orderType: !hidden.includes('orderType'),
			description: !hidden.includes('description'),
			status: !hidden.includes('status'),
			criticality: !hidden.includes('criticality'),
		};
		setChecked(checkedObj);
	}, [hidden.length, hidden]);

	return (
		<div className="listBody">
			<ul className="list-unstyled">
				{Object.keys(config.labels.alias).map((key) => (
					<li key={`list-unstyled-${key}`}>
						<Switch
							id={key}
							checked={checked[key]}
							onChange={(event) => handleChange(event.target.checked, event.target.id)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
						<FormattedMessage id={`issue.list.${key}`} />
					</li>
				))}
				</ul>
				<div className="listFooter">
					<button type="button" className="button" onClick={() => updateHeader(hidden)}>Aplicar Cambios</button>
				</div>
			</div>
		);
}

export default injectIntl(HeaderSwitch);