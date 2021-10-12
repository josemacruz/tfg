import React, { useEffect, useState } from 'react';
import IssuesFilter from './components/IssuesFilter';
import './styles.scss';

export function ModifyFilters({ widgetConfig }) {
  const [config, setConfig] = useState(widgetConfig);
  const [conditions, setConditions] = useState(widgetConfig.conditions)
  return (
    <div>
       <IssuesFilter
        conditionState={conditions}
        updateConditions={() => null}
        className="AddWidgetIssues"
       />
    </div>
  );
}
