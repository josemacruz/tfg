import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDevices } from '../../services/redux/devices/actions';
import Widget from '../../components/Widget';
import { widgetConfig, widgetConfigDevice , widgetConfigRules } from '../ListIssues/Issues';
import { getIssues } from '../../services/redux/issues/actions';
import { getRules } from '../../services/redux/rules/actions';
import './styles.scss';

function Home() {
  const devices = useSelector((state) => state.get('devices').get('list').toJS());
  const issues = useSelector((state) => state.get('issues').get('list').toJS());
  const rules = useSelector((state) => state.get('rules').get('list').toJS());

 useEffect(() => {
  getIssues();
  getDevices();
  getRules();
  }, []);

  return (
    <div className="dashboardContainer">
      <div className="row1">
        <Widget
          title="Lista de incidencias"
          handleProfile
          hanldeAdd
          data={issues}
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
            config={widgetConfigDevice.config}
          />
        </div>
        <div className="right-widget">
          <Widget
            title="Listado de reglas"
            handleProfile
            hanldeAdd
            data={rules}
            config={widgetConfigRules.config}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
