import React from 'react';
import Widget from '../../components/Widget';
import { widgetConfig } from '../Widgets/Widgets';

function Rules() {
  return (
    <div className="dashboardContainer">
        <Widget
          title="Listado de reglas"
          handleProfile
          handleAdd
          addButton="Añadir regla"
          data={[]}
          config={widgetConfig.config}
        />
    </div>
  );
}

export default Rules;
