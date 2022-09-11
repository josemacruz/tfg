import React, { useEffect } from "react";
import WidgetNeedle from "./widget";
import { useSelector } from 'react-redux';
import { readDevice } from "../../services/redux/actions";
import moment from 'moment';
import "./index.scss";

function WidgetsContainer() {
	const device = useSelector((state) => state.get('redux').get('device'));

	useEffect(() => {
		readDevice();
		setInterval(() => {
			readDevice();
		}, [5000])
	}, [])

	return (
		<div className="widgetContainer">
					<span className="time">{`Última actualización: ${moment(device[0]?.TimeInstant.value).format("DD MM YYYY hh:mm:ss")}`}</span>
					<div className="widgetItem">
						<div className="item">
							<span>Humedad</span>
							<WidgetNeedle
								value={device[0]?.humidity.value}
								text="g / m³"
							/>
						</div>
						<div className="item">
							<span>Temperatura</span>
							<WidgetNeedle
								value={device[0]?.temperature.value}
								text="C"
							/>
						</div>
						<div className="item">
							<span>Dióxido de carbono</span>
							<WidgetNeedle
								value={device[0]?.carbondioxide.value}
								text="ug/m3"
							/>
						</div>
						<div className="item">
							<span>Presión atmosférica</span>
							<WidgetNeedle
								value={device[0]?.pressure.value}
								text="hPa"
							/>
						</div>
					</div>

				</div>
	)
}

export default WidgetsContainer;
