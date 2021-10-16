import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Widget";
import { getIssues, getServices } from "../../services/redux/issues/actions";
import { getWidget } from "../../services/redux/widgets/actions";
import { getFormattedIssues } from "../Issues/helpers";
import { WidgetProfile } from "./Profile";
import { widgetConfiguration } from "../../components/Widget/utils";


export function Dashboard() {

	const [openProfile, setOpenProfile] = useState(false);
	const [widgetConfig, setWidgetConfig] = useState([ widgetConfiguration ]);
	const issues = useSelector((state) => state.get('issues').get('list').toJS());
	const services = useSelector((state) => state.get('issues').get('listServices').toJS());
	const widgets = useSelector((state) => state.get('widgets').get('list').toJS());

	const handleOpenProfile = () => {
		setOpenProfile(!openProfile);
	}
  const formattedIssues = useMemo(() => getFormattedIssues(
    issues,
    services,
  ), [issues.length, services.length]);

	useEffect(() => {
		if (widgets.length) {
			const newWidgets = [];
			widgets.forEach((widget) => {
				newWidgets.push({ id: widget.id, config: widget.config.value });
			});
			setWidgetConfig(newWidgets);
		}
	}, [widgets.length])

	console.log(widgetConfig, 'asda');

	useEffect(() => {
		getWidget();
		getIssues();
		getServices();
	}, []);

	return (
		<div className="dashboardContainer">
			<Widget 
				title="Lista de Incidencias"
				handleProfile={handleOpenProfile}
				data={formattedIssues}
				config={widgetConfig ? widgetConfig.find((o) => (o.id === 'widget:issues')).config : []}
			/>
			{openProfile && (
        <WidgetProfile 
					setOpenProfile={setOpenProfile}
					close={handleOpenProfile}
					config={widgetConfig ? widgetConfig.find((o) => (o.id === 'widget:issues')).config : []}
					setWidgetConfig={setWidgetConfig}
				/>
      )}
		</div>
	)
}