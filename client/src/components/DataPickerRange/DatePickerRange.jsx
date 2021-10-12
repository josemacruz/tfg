/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function DatePickerRange(props) {
  const {
    label, from, to, onChange,
  } = props;

  // * --------------------- [STATE] --------------------- * //
  const [startDate, setStartDate] = useState(from ?? '');
  const [endDate, setEndDate] = useState('');
  // * --------------------- [STATE] --------------------- * //

  const handleChangeSelect = (name, value) => {
    if (name === 'startDate') {
      setStartDate(value.toISOString());
    } else {
      value.setDate(value.getDate() + 1);
      setEndDate(value.toISOString());
    }
    onChange && onChange(name, value.toISOString());
  };

  useEffect(() => {
    if (to) {
      const newEndDate = new Date(to);
      newEndDate.setDate(newEndDate.getDate() - 1);
      setEndDate(newEndDate.toISOString());
    }
  }, [to]);

  return (
    <>
      <div className="datePickerRange">
        <span className="fieldLabel">{label}</span>
        <div className="rowDate">
          <Select
            className="uil uil-calender"
            name="startDate"
            type="date"
            value={startDate ? new Date(startDate) : ''}
            onChange={(name, value) => handleChangeSelect(name, value)}
          />
          <hr />
          <Select
            className="uil uil-calender"
            name="endDate"
            type="date"
            value={endDate ? new Date(endDate) : ''}
            onChange={(name, value) => handleChangeSelect(name, value)}
          />
        </div>
      </div>
    </>
  );
}

export default DatePickerRange;
