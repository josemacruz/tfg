import React from 'react';

function WidgetGuage({ value, text }) {
  return (
    <div className='widgetValue'>
      <span className='value'>{value}</span>
      <span className='text'>{text}</span>
    </div>
  );
}

export default WidgetGuage;
