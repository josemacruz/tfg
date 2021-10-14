import React, { useEffect, useRef, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { TabPanel } from '../../../components/Tabs';
import './styles.scss';
import { ModifyFilters } from './sections/ModifyFilters';
import ColorPicker from '../../../components/ColorPicker';
import ExpansionPanel from '../../../components/ExpansionPanel';
import { updateWidget } from '../../../services/redux/widgets/actions';

export function WidgetProfile({ setOpenProfile, close, config, setWidgetConfig }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  const handleOnChange = (name, value) => {
  };

  const validate = (conditions) => {
    const newConfig = [];
    newConfig.push({ id: 'widget:issues', config : { ...config, conditions }});
    setWidgetConfig(newConfig);
    const configUpdate = {
      "config": {
        "value": {
          ...config,
          conditions
        },
      },
    };
    updateWidget({ id: 'widget:issues', body: configUpdate});
  };

  const validateColor = (colors) => {
    const newConfig = [];
    newConfig.push({ id: 'widget:issues', config : { ...config, colors }});
    setWidgetConfig(newConfig);
    const configUpdate = {
      "config": {
        "value": {
          ...config,
          colors
        },
      },
    };
    updateWidget({ id: 'widget:issues', body: configUpdate});
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  const a11yProps = (index) => ({
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
  });

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <div className="profileContainer" ref={ref}>
      <div className="profileHeader">
        <h2>Incidencia</h2>
      </div>
      <div className="descriptionSection">
        <h3>Descripción</h3>
        <p>DESCRIPCION DE EL PROFILE DEL WIDGET</p>
      </div>
      <div className="profileContents">
        <Tabs value={value} aria-label="basic tabs example" onChange={(event, newValue) => setValue(newValue)}>
          <Tab label="Configuración" {...a11yProps(0)}  />
          <Tab label="Filtrado de Incidencias" {...a11yProps(1)}  />
        </Tabs>
        <TabPanel value={value} index={0}>
        <ExpansionPanel 
          title={'colors'}
        >
          <ColorPicker
            config={config}
            validateColor={validateColor}
          /> 
        </ExpansionPanel>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ModifyFilters
            widgetConfig={config}
            validate={validate}
          />
        </TabPanel>
      </div>
    </div>
  );
}
