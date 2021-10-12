import Moment from "moment";
import colors from "../configuration/colors";

const getAllAttributes = (object, labelAlias, onTranslate, exclude = []) => {
  const attributes = {};
  let currentAlias = Object.keys(labelAlias);
  if (exclude.length) {
    currentAlias = currentAlias.filter((o) => !exclude.includes(o));
  }
  currentAlias.forEach((alias) => {
    switch (alias) {
      case 'family':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'subFamily':
          attributes[alias] = {
            value: object[alias],
            metadata: { },
          };
        break;
      case 'orderType':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'category':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'dateCreated':
      case 'description':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'criticality':
        attributes[alias] = {
          value: object[alias],
          metadata: {
            color: colors[`criticality-${object[alias]}`],
          },
        };
        break;
      case 'status':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'id': 
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'type':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      case 'temperature':
        attributes[alias] = {
          value: object[alias].value,
          metadata: { },
        };
        break;
      case 'humidity':
        attributes[alias] = {
          value: object[alias],
          metadata: { },
        };
        break;
      default:
        break;
    }
  });
  return attributes;
};

export const formatToData  = (configuration, data) => {
	const columns = [];
	const rows = [];
	const { alias = [] } = configuration.labels;
  const { hidden = [] } = configuration.appearance;
  const { conditions = [] } = configuration;
	let filtersData = [];

	const types = {
		date: 'date',
    category: 'string',
    family: 'string',
    subFamily: 'string',
    orderType: 'string',
    description: 'string',
    status: 'string',
    criticality: 'tag',
	};

	const filters = {
    date: 'agDateColumnFilter',
    description: 'simpleFilter',
  };

	Object.entries(alias).forEach(([key, value]) => {
    if (!hidden.includes(key)) {
      columns.push({
        headerName: key.includes(value) ? value : '',
        key,
        type: types[key] ?? 'string',
        filter: filters[key] ?? 'selectableFilter',
      });
    }
  });

  if (data) {
    data.forEach((dt) => {
      let firstCondition = true;
      if (conditions.length) {
        conditions.forEach((obj) => {
          if (Object.keys(dt[obj.filter]).length) {
            switch (obj.filter) {
              case 'dateCreated':
                obj.contents.forEach((cnt) => {
                  if (firstCondition) {
                    if (cnt.startDate && cnt.endDate) {
                      const isBetween = Moment(dt.dateCreated)
                        .isBetween(cnt.startDate, cnt.endDate);
                      if (isBetween) {
                        if (firstCondition) firstCondition = false;
                        filtersData.push(dt);
                      }
                    }
                  } else {
                    filtersData = filtersData.filter((d) => {
                      if (cnt.startDate && cnt.endDate) {
                        const isBetween = Moment(d.dateCreated)
                          .isBetween(cnt.startDate, cnt.endDate);
                        if (isBetween) {
                          return d;
                        }
                      }
                    });
                  }
                });
                break;
              case 'family':
                if (firstCondition) {
                  if (obj.contents.includes(dt[obj.filter].name)) {
                    if (firstCondition) firstCondition = false;
                    filtersData.push(dt);
                  }
                } else {
                  filtersData = filtersData.filter((d) => {
                    if (obj.contents.includes(d[obj.filter].name)) {
                      return d;
                    }
                  });
                }
                break;
              case 'subFamily':
                if (firstCondition) {
                  dt[obj.filter].forEach((d) => {
                    if (obj.contents.includes(d.serviceName)) {
                      if (firstCondition) firstCondition = false;
                      filtersData.push(dt);
                    }
                  });
                } else {
                  filtersData = filtersData.filter((d) => {
                    if (obj.contents.includes(d.serviceName)) {
                      return d;
                    }
                  });
                }
                break;
              default:
                if (firstCondition) {
                  if (obj.contents.includes(dt[obj.filter].toLowerCase())) {
                    filtersData.push(dt);
                  }
                  if (firstCondition) firstCondition = false;
                } else {
                  filtersData = filtersData.filter((d) => {
                    if (obj.contents.includes(d[obj.filter].toLowerCase())) {
                      return d;
                    }
                  });
                }
                break;
            }
          }
        });
      } else {
        rows.push({
          id: dt.id,
          ...getAllAttributes(dt, alias),
        });
      }
    });
    if (filtersData.length) {
      filtersData.forEach((dt) => {
        rows.push({
          id: dt.id,
          ...getAllAttributes(dt, alias),
        });
      });
    }
  }
  return [rows, columns];
}