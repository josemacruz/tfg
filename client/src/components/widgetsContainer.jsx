import React, { useEffect } from "react";
import WidgetNeedle from "../components/widget";
import { useSelector } from 'react-redux';
import { readDevice } from "../services/redux/actions";

function WidgetsContainer() {
	const device = useSelector((state) => state.get('redux').get('device'));

	useEffect(() => {
		readDevice();
		setInterval(() => {
			readDevice();
		}, [5000])
	}, [])

	return (
		<div className="widget">
					<span>{`Última actualización: ${device[0]?.TimeInstant.value}`}</span>
					<div className="widgets">
						<div>
							<span>Humedad</span>
							<WidgetNeedle
								value={device[0]?.humidity.value/100}
							/>
						</div>
						<div>
							<span>Temperatura</span>
							<WidgetNeedle
								value={device[0]?.temperature.value/100}
							/>
						</div>
						<div>
							<span>Dioxido de carbono</span>
							<WidgetNeedle
								value={device[0]?.carbondioxide.value/100}
							/>
						</div>
						<div>
							<span>Presión</span>
							<WidgetNeedle
								value={device[0]?.pressure.value/100}
							/>
						</div>
					</div>

				</div>
	)
}

export default WidgetsContainer;
