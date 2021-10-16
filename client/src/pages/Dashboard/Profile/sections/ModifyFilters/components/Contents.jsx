import React, { useEffect, useMemo, useState } from 'react';
import DatePickerRange from '../../../../../../components/DataPickerRange/DatePickerRange';
import Select from '../../../../../../components/Select/index'
import { categories, criticality, family, orderType, status, subFamily } from './utils/constants';

function Contents(props) {
  const {
    condition,
    filtersValues,
    handleChange,
    contentIndex,
    addContent,
    removeContent,
  } = props;

  const [currentCondition, setCurrenCondition] = useState(condition);

  const getFilter = (filter) => {
    const filters = {
      category: categories,
      criticality: criticality,
      family: family,
      subFamily: subFamily,
      orderType: orderType,
      status: status,
    };
    return filter ? filters[filter] : [];
  };

  useEffect(() => {
    if (condition) setCurrenCondition(condition);
  }, [condition]);

  return (
    <>
      {currentCondition.filter !== 'dateCreated' ? (
        ['contents'].map((key) => (
          <Select
            name={key}
            options={getFilter(currentCondition.filter)}
            value={currentCondition[key][contentIndex]}
            onChange={(value) => handleChange(
              { [key]: value }, currentCondition, contentIndex,
            )}
            size={5}
          />
        ))
      ) : (
        <DatePickerRange
          label
          from={currentCondition.contents[contentIndex].startDate}
          to={currentCondition.contents[contentIndex].endDate}
          onChange={(name, value) => handleChange(
            { [name]: value }, currentCondition, contentIndex,
          )}
        />
      )}
      {contentIndex === currentCondition.contents.length - 1 && (
        <div className="buttons m-0 p-0">
          <button
            className="circular"
            name="plus"
            onClick={() => addContent(currentCondition)}
          >+</button>
        </div>
      )}
      <div className="buttons m-0 p-0">
        <button
          className="circular"
          name="minus"
          onClick={() => removeContent(currentCondition, contentIndex)}
        >-</button>
      </div>
    </>
  );
}

export default Contents;
