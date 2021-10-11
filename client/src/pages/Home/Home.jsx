import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getDevices } from '../../services/redux/devices/actions';
import Widget from '../../components/Widget';
// import { widgetConfig, widgetConfigDevice , widgetConfigRules } from '../ListIssues/Issues';
import { getIssues } from '../../services/redux/issues/actions';
import { getRules } from '../../services/redux/rules/actions';
import './styles.scss';
import { TableProfile } from '../../components/TableProfile';

function Home() {
  const devices = useSelector((state) => state.get('devices').get('list').toJS());
  const issues = useSelector((state) => state.get('issues').get('list').toJS());
  const rules = useSelector((state) => state.get('rules').get('list').toJS());
  const [openProfile, setOpenProfile] = useState(false);
  const ref = useRef(null);
  const handleOpenProfile = () => {
    setOpenProfile(true);
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
  });
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
          handleProfile={handleOpenProfile}
          data={issues}
          // config={widgetConfig.config}
        />
      </div>
      <div className="row2">
        <div className="left-widget">
          <Widget
            title="Dispotivos conectados"
            handleProfile={handleOpenProfile}
            data={devices}
            // config={widgetConfigDevice.config}
          />
        </div>
        <div className="right-widget">
          <Widget
            title="Listado de reglas"
            handleProfile={handleOpenProfile}
            data={rules}
            // config={widgetConfigRules.config}
          />
        </div>
      </div>
      {openProfile && (
        <div ref={ref}>
          <TableProfile />
        </div>
      )}
    </div>
  );
}

export default Home;
