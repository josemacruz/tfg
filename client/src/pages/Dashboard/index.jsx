import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Widget";
import { widgetConfig } from "../../components/Widget/utils";
import { getIssues, getServices } from "../../services/redux/issues/actions";
import { getFormattedIssues } from "../Issues/helpers";
import { WidgetProfile } from "./Profile";

export function Dashboard() {

	const [openProfile, setOpenProfile] = useState(false);
	const issues = useSelector((state) => state.get('issues').get('list').toJS());
	const services = useSelector((state) => state.get('issues').get('listServices').toJS());

	const handleOpenProfile = () => {
		setOpenProfile(!openProfile);
	}
  const formattedIssues = useMemo(() => getFormattedIssues(
    issues,
    services,
  ), [issues.length, services.length]);

	useEffect(() => {
		getIssues();
	}, [getIssues])

	useEffect(() => {
		getServices();
	}, [getServices])

	return (
		<div className="dashboardContainer">
			<Widget 
				title="Lista de Incidencias"
				handleProfile={handleOpenProfile}
				data={formattedIssues}
				config={widgetConfig.config}
			/>
			{openProfile && (
        <WidgetProfile 
					setOpenProfile={setOpenProfile}
					close={handleOpenProfile}
					widgetConfig={widgetConfig.config}
				/>
      )}
		</div>
	)
}