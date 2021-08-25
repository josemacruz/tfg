import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import Select from 'react-select';
import './styles.scss';

const getFormattedOptions = (list, field) => {
  const attribute = field.split('.')[0];
  const formattedOptions = [];

  // list.forEach((data) => {
  //   if (data.attribute === attribute) {
  //     data.value.forEach((v) => {
  //       const { name } = v;
  //       formattedOptions.push({
  //         value: name.value,
  //         label: name.label,
  //       });
  //     });
  //   }
  // });

  return formattedOptions;
};

export default forwardRef((props, ref) => {
  const { agGridReact, colDef } = props;
  const { field } = colDef;
  const { optionsList } = agGridReact.props;
  const [filterText, setFilterText] = useState([]);
  const [options] = useState(() => getFormattedOptions(optionsList, field));
  const [selected, setSelected] = useState([]);

  useImperativeHandle(ref, () => ({
    doesFilterPass(params) {
      let passed = false;
      if (!filterText.length) {
        passed = true;
      } else {
        filterText
          .forEach((filterWord) => {
            const value = props.valueGetter(params);
            if (value === filterWord || value?.value === filterWord) {
              passed = true;
            }
          });
      }
      return passed;
    },

    isFilterActive() {
      return true;
    },
  }));

  const clearAll = () => {
    setSelected([]);
    setFilterText([]);
  };

  const handleSelectChange = (values) => {
    const filterToPush = [];

    if (values.length) {
      values.forEach((event) => filterToPush.push(event.value));
    }
    setSelected(values);
    setFilterText(filterToPush);
  };

  const handleRemoveValue = (e) => {
    const { id: buttonName } = e.target;
    const removedValue = selected.find((val) => val.value === buttonName);
    if (!removedValue) return;
    handleSelectChange(
      selected.filter((val) => val.value !== buttonName),
      { action: 'remove-value', removedValue },
    );
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [filterText, props]);

  return (
    <div className="customFilter">
      <div className="selectFilter">
        <Select
          placeholder='filters.select'
          onChange={handleSelectChange}
          isMulti
          options={options}
          value={selected}
          controlShouldRenderValue={false}
        />
      </div>
      <div className="filterContainer">
        {selected.map((val) => (
          <div className="wrapper">
            <div className="wrapperText">
              <div className="text">
                {val.label}
              </div>
              <div className="icon">
                <i role="presentation" className="uil uil-times" id={val.value} onClick={handleRemoveValue} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button type="button" className="clearButton" onClick={clearAll}>filtersFinder.clean</button>
      </div>
    </div>
  );
});
