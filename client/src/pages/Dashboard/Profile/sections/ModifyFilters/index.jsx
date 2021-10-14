import React, { useState } from 'react';
import IssuesFilter from './components/IssuesFilter';
import './styles.scss';

export function ModifyFilters({ widgetConfig, validate }) {
  const [conditions, setConditions] = useState(widgetConfig.conditions)

  const updateConditions = (conditions) => {
    setConditions(conditions);
  }

  return (
    <>
       <IssuesFilter
        conditionState={conditions}
        updateConditions={updateConditions}
        className="ModifyFilters"
       />
       <div className="profileFooter">
        <button type="button" className="button" onClick={() => validate(conditions)}>Aplicar Cambios</button>
      </div>
    </>
  );
}
