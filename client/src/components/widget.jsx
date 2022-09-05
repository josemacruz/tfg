import React from 'react';
import GaugeChart from 'react-gauge-chart'

function WidgetGuage({ value }) {
  return (
    <GaugeChart id="gauge-chart5"
      nrOfLevels={3}
      colors={['#5BE12C', '#F5CD19', '#EA4228']}
      percent={value}
      textColor="black"
    />
  );
}

export default WidgetGuage;
