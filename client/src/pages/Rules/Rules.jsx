import React from 'react';
import Widget from '../../components/Widget';

function Rules() {
  return (
    <div className="dashboardContainer">
        <Widget
          title="Listado de reglas"
          handleProfile
          handleAdd
          addButton="Añadir regla"
        />
    </div>
  );
}

export default Rules;
