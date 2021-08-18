import React from 'react';
import Widget from '../../components/Widget';

function Widgets() {
  return (
    <div className="dashboardContainer">
        <Widget
          title="Listado de incidencias"
          handleProfile
          handleAdd
          addButton="Añadir incidencia"
        />
    </div>
  );
}

export default Widgets;
