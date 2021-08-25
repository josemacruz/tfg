import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { cloneDeep } from 'lodash';
import './styles.scss';

export default forwardRef((props, ref) => {
  const [filterText, setFilterText] = useState([]);

  useImperativeHandle(ref, () => ({
    doesFilterPass(params) {
      let passed = false;
      if (!filterText.length) {
        passed = true;
      } else {
        filterText.forEach((text) => (
          text.toLowerCase()
            .split(' ')
            .forEach((filterWord) => {
              const value = props.valueGetter(params);
              if (value.toString().toLowerCase().indexOf(filterWord) !== -1) {
                passed = true;
              }
            })
        ));
      }
      return passed;
    },

    isFilterActive() {
      return true;
    },
  }));

  const clearAll = () => {
    setFilterText([]);
  };

  const onKeyDown = (e) => {
    const { keyCode } = e;
    const filterToPush = [];
    if (filterText.length) {
      filterText.forEach((text) => {
        filterToPush.push(text);
      });
    }
    if (keyCode === 13) {
      filterToPush.push(e.target.value);
      e.target.value = '';
    }
    if (filterToPush.length > 0) setFilterText(filterToPush);
  };

  const removeSelection = (e) => {
    const value = e.target.id;
    const cloneFilter = cloneDeep(filterText);
    cloneFilter.forEach((text) => {
      if (text === value) {
        const index = filterText.indexOf(text);
        cloneFilter.splice(index, 1);
      }
    });
    setFilterText(cloneFilter);
  };

  useEffect(() => {
    props.filterChangedCallback();
  }, [filterText, props]);

  return (
    <div className="simpleContainer">
      <div className="simpleFilter">
        <input
          type="text"
          className="simpleCustomFilter"
          onKeyDown={onKeyDown}
          placeholder='filters.search'
        />
      </div>
      <div className="filterContainer simple">
        {filterText.length > 0 && (
          filterText.map((text) => (
            <div className="wrapper">
              <div className="wrapperText">
                <div className="text">{text}</div>
                <div className="icon">
                  <i role="presentation" className="uil uil-times" id={text} onClick={(e) => removeSelection(e)} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="buttonContainer">
        <button type="button" className="clearButton" onClick={clearAll}>filtersFinder.clean</button>
      </div>
    </div>
  );
});
