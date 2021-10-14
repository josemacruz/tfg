/* eslint-disable import/no-cycle */
import React, {
  useEffect,
  useState,
} from 'react';
import * as R from 'ramda';
import Select from '../../../../../../components/Select/index';
import { filterList } from './utils/constants';

function FilterComponent(props) {
  const { condition, handleChange } = props;
  const [conditionState, setConditionState] = useState(condition);
  const [firstRender, setFirstRender] = useState(true);

  const handleSelectedChange = (newData) => {
    const data = { ...newData };
    setConditionState((prev) => {
      setConditionState({ ...prev, ...data });
    });
  };

  useEffect(() => {
    if (!firstRender) handleChange(conditionState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditionState]);

  useEffect(() => {
    if (!R.equals(condition, conditionState)) {
      setConditionState(condition);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition]);

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <>
      {['filter'].map((key) => (
        <Select
          name={key}
          options={filterList}
          value={conditionState[key]}
          onChange={(value) => handleSelectedChange({ [key]: value })}
        />
      ))}
    </>
  );
}

export default FilterComponent;
