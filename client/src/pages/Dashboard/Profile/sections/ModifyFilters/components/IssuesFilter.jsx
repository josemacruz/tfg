/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getServices } from '../../../../../../services/redux/issues/actions';
import Contents from './Contents';
import FilterComponent from './FilterComponent';

const getDefaultCondition = () => ({
  id: Date.now(),
  filter: '',
  contents: [{}],
});

const replaceSymbol = (text) => {
  if (text?.indexOf('_')) return text.replace(/_/g, '-');
  return text;
};

export const getAllServices = (familyList) => {
  const family = [];
  const subFamily = [];
  const orderType = [];
  const category = [];
  const criticality = [];
  const status = [];
  const isIncluded = [];

  familyList.forEach((service) => {
    if (service.group === '') {
      if (service.name !== 'default') {
        family.push({ label: <FormattedMessage id={`issues.family.${service.name}`} />, value: `fiwoo:issue-service:${service.id}` });
      }
    } else {
      subFamily.push({ label: <FormattedMessage id={`issues.subFamily.${service.name}`} />, value: service.name });
      if (service.status) {
        service.status.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            status.push({ label: <FormattedMessage id={`issues.status.${order}`} />, value: replaceSymbol(order) });
          }
        });
      }
      if (service.criticalities) {
        service.criticalities.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            criticality.push({ label: <FormattedMessage id={`issues.criticality.${order}`} />, value: order });
          }
        });
      }
      if (service.categoryType) {
        service.categoryType.forEach((order) => {
          if (!isIncluded.includes(order)) {
            isIncluded.push(order);
            category.push({ label: <FormattedMessage id={`categories.${order}`} />, value: replaceSymbol(order) });
          }
        });
      }
      if (service.issueType) {
        service.issueType.forEach((order) => {
          if (!orderType.includes(order)) orderType.push({ label: <FormattedMessage id={`issues.orderType.${order}`} />, value: replaceSymbol(order) });
        });
      }
    }
  });
  return [family, subFamily, orderType, category, criticality, status];
};

function IssuesFilter(props) {
  const {
    conditionState, updateConditions, className, handleConditions,
  } = props;

  const issueServices = useSelector((state) => state.get('issues').get('listServices').toJS());

  const [conditions, setConditions] = useState(Array.isArray(conditionState) ? conditionState : []);
  const [filtersValues, setFiltersValues] = useState({});
  const [newIssueServices, setNewIssueServices] = useState(issueServices);

  const addNewFilter = () => {
    const newCondition = getDefaultCondition();
    const cloneCondition = cloneDeep(conditions);
    cloneCondition.push(newCondition);
    setConditions(cloneCondition);
  };

  const removeAllFilters = () => {
    const cloneCondition = cloneDeep(conditions);
    cloneCondition.splice(0, cloneCondition.length);
    setConditions(cloneCondition);
  };

  const handleOnChange = (value) => {
    const cloneCondition = cloneDeep(conditions);
    cloneCondition.forEach((c) => {
      if (c !== undefined && c.id === value.id) {
        const currentValue = c;
        currentValue.filter = value.filter;
        if (currentValue.filter && value.filter !== currentValue.filter) {
          currentValue.contents.splice(0, currentValue.contents.length);
        } else {
          currentValue.contents = value.contents;
        }
      }
    });

    setConditions(cloneCondition);
  };

  const handleSelectedChange = (value, currentCondition, contentIndex) => {
    const cloneCondition = cloneDeep(conditions);
    const index = contentIndex;
    const currentValue = Object.values(value)[0];
    cloneCondition.forEach((cond) => {
      if (cond.id === currentCondition.id) {
        const { contents } = cond;
        if (Object.keys(value).includes('contents')) {
          contents[index] = currentValue;
        } else {
          const date = { ...contents[index], ...value };
          contents[index] = date;
        }
      }
    });

    setConditions(cloneCondition);
  };

  const addContent = (currentCondition) => {
    let newContent;
    const cloneCondition = cloneDeep(conditions);
    cloneCondition.forEach((cond) => {
      if (cond.id === currentCondition.id) {
        let { contents } = cond;
        newContent = contents;
        newContent.push({});
        contents = newContent;
      }
    });

    setConditions(cloneCondition);
  };

  const removeContent = (currentCondition, index) => {
    const newCondition = [];
    const cloneCondition = cloneDeep(conditions);
    cloneCondition.forEach((cond) => {
      if (cond.id === currentCondition.id) {
        if (cond.contents.length > 1) {
          cond.contents.splice(index, 1);
          setConditions(cloneCondition);
        } else {
          delete cloneCondition[cloneCondition.indexOf(cond)];
          cloneCondition.forEach((condition) => {
            if (condition) newCondition.push(condition);
          });
          setConditions(newCondition);
        }
      }
    });
  };

  useEffect(() => {
    const [
      family,
      subFamily,
      orderType,
      categories,
      criticality,
      status,
    ] = getAllServices(newIssueServices);

    setFiltersValues({
      family,
      subFamily,
      orderType,
      categories,
      criticality,
      status,
    });
  }, [newIssueServices]);

  useEffect(() => {
    if (issueServices?.length) setNewIssueServices(issueServices);
  }, [issueServices.length]);

  useEffect(() => {
    let control;
    conditions.forEach((cond) => {
      control = false;
      if (cond.filter) {
        control = true;
      }
    });

    if (control || !conditions.length) updateConditions(conditions);
  }, [conditions]);

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <div className={`rowContainer-${className}`}>
      <div className="buttons filterButtons">
        <button
          type={handleConditions ? 'primary' : 'secondary'}
          className={`btn btn-${handleConditions ? 'primary' : 'secondary'}`}
          onClick={addNewFilter}
          label={(
            <FormattedMessage
              id="widgetIssues.wizard.step3.addFilter"
            />
          )}
        >add</button>
        <button type="button" className={conditions.length ? 'removeFilters-active' : 'removeFilters'} onClick={removeAllFilters}>
          <FormattedMessage id="widgetIssues.wizard.step3.removeFilters" />
        </button>
      </div>
      {!!conditions.length && (
        conditions.map((cond) => (
          <div className="filtersContainer">
            <div className="filtersGroup">
              <div className="filters">
                <div className="filter">
                  <FilterComponent
                    condition={cond}
                    addContent
                    handleChange={handleOnChange}
                  />
                </div>
                <div className="contentComponent">
                  <Contents
                    condition={cond}
                    contentIndex={0}
                    addContent={addContent}
                    removeContent={removeContent}
                    handleChange={handleSelectedChange}
                    filtersValues={filtersValues}
                  />
                </div>
              </div>
            </div>
            {cond.contents.length > 1 && (
              cond.contents.map((cnt, ind) => (
                ind !== 0 && (
                <div className="filtersGroupContents">
                  <div className="contents">
                    <Contents
                      condition={cond}
                      contentIndex={ind}
                      addContent={addContent}
                      removeContent={removeContent}
                      handleChange={handleSelectedChange}
                      filtersValues={filtersValues}
                    />
                  </div>
                </div>
                )
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default injectIntl(IssuesFilter);
