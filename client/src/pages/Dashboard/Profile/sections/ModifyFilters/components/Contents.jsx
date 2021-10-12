import React, { useEffect, useMemo, useState } from 'react';
import DatePickerRange from '../../../../../../components/DataPickerRange/DatePickerRange';
import Select from '../../../../../../components/Select/index'
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

  const getOptions = (entities) => (entities?.length ? entities
    .map((o) => ({ label: o.name, value: o.value })) : []);

  const getFilter = (filter) => {
    const filters = {
      category: optionsCat,
      // criticality: getOptions(filtersValues.criticality),
      // family: getOptions(filtersValues.family),
      // subFamily: getOptions(filtersValues.subFamily),
      // orderType: getOptions(filtersValues.orderType),
      // status: getOptions(filtersValues.status),
      // source: getOptions(sources),
    };
    return filter ? filters[filter] : [];
  };

  const options = useMemo(() => getFilter(
    currentCondition.filter,
  ), [currentCondition.filter, filtersValues]);

  const optionsCat = {
    goodomens: "Good Omens",
    neverwhere: "Neverwhere",
    stardust: "Stardust",
    americangods: "American Gods",
    coraline: "Coraline",
    anansiboys: "Anansi Boys",
    interworld: "InterWorld",
    thegraveyardbook: "The Graveyard Book",
    thesilverdream: "The Silver Dream",
    theoceanattheendofthelane: "The Ocean at the End of the Lane",
    eternityswheel: "Eternity's Wheel",
    norsemythology: "Norse Mythology"
  }

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
            type="circular"
            name="plus"
            onClick={() => addContent(currentCondition)}
          />
        </div>
      )}
      <div className="buttons m-0 p-0">
        <button
          type="circular"
          name="minus"
          onClick={() => removeContent(currentCondition, contentIndex)}
        />
      </div>
    </>
  );
}

export default Contents;
