/* eslint-disable no-unused-vars */
/* eslint-disable no-dupe-keys */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDevices } from '../../services/redux/devices/actions';
import './styles.scss';
import Widget from '../../components/Widget';
import { widgetConfig } from '../Widgets/Widgets';

function Home() {
  const devices = useSelector((state) => state.get('devices').get('list').toJS());
  useEffect(() => {
  getDevices();
  }, []);

  console.log('DEVICES', devices);

  return (
    <div className="dashboardContainer">
      <div className="row1">
        <Widget
          title="Lista de incidencias"
          handleProfile
          hanldeAdd
          data={devices}
          config={widgetConfig.config}
        />
      </div>
      <div className="row2">
        <div className="left-widget">
          <Widget
            title="Dispotivos conectados"
            handleProfile
            hanldeAdd
            data={devices}
            config={widgetConfig.config}
          />
        </div>
        <div className="right-widget">
          <Widget
            title="Listado de reglas"
            handleProfile
            hanldeAdd
            data={devices}
            config={widgetConfig.config}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
