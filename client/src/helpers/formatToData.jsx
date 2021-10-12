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
      rows.push({
        id: dt.id,
        ...getAllAttributes(dt, alias),
      });
    });
  }
  return [rows, columns];
}