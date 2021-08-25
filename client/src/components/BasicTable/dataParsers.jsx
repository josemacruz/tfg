import Moment from 'moment';
import colors from '../../configuration/colors';
import typography from '../../configuration/typography';
import './styles.scss';

const dateParser = (params) => {
  const att = params.colDef.field;
  const format = 'DD/MM/YYYY';
  return Moment.utc(params.data[att]).format(format);
};

const getColumnDefs = (data) => {
  const columnDefs = [];
  const addedCol = [];
  data.forEach((col) => {
    if (!addedCol.includes(col.headerName)) {
      addedCol.push(col.headerName);
      switch (col.type) {
        case 'date':
          columnDefs.push({
            headerName: col.headerName,
            filter: col.filter,
            field: col.key,
            sortable: true,
            valueGetter: dateParser,
            cellStyle: () => ({
              'text-aling': 'left',
            }),
            filterParams: {
              defaultOption: 'inRange',
              buttons: ['reset', 'apply'],
              comparator(filterLocalDataAtMidnight, cellValue) {
                const dataAsString = cellValue;
                if (dataAsString === null) return -1;
                const dateParts = dataAsString.split('/');
                const cellDate = new Date(
                  Number(dateParts[2]),
                  Number(dateParts[1]) - 1,
                  Number(dateParts[0]),
                );
                if (filterLocalDataAtMidnight.getTime() === cellDate.getTime()) {
                  return 0;
                }
                return (cellDate < filterLocalDataAtMidnight) ? -1 : 1;
              },
            },
          });
          break;
        case 'tag':
          columnDefs.push({
            headerName: col.headerName,
            field: col.key,
            sortable: true,
            filter: col.filter,
            cellStyle: () => ({
              'text-aling': 'left',
              'padding-left': '0',
            }),
            cellRenderer: (params) => (
              `
                <div class="tagStyles">
                <p style="background-color: ${params.value.metadata.color};  text-align: center;
                color: ${colors['ui-White']};
                font-family: ${typography};
                font-size: 1rem;
                font-weight: 600;
                letter-spacing: 0;
                line-height: 1.2rem;
                overflow: hidden;
                height: 2rem;
                width: 4.8rem;
                padding: 0.4rem;
                margin: 0.25rem 0.25rem 0.25rem 0;">${params.value.value}</p>
                </div>`
            ),
          });
          break;
        case 'string':
          columnDefs.push({
            headerName: col.headerName,
            field: `${col.key}.value`,
            filter: col.filter,
            sortable: true,
            cellStyle: () => ({
              'text-aling': 'left',
            }),
          });
          break;
        default:
          columnDefs.push({
            headerName: col.headerName,
            field: col.key,
            filter: col.filter,
            sortable: true,
            cellStyle: () => ({
              'text-aling': 'left',
            }),
          });
          break;
      }
    }
  });
  return columnDefs;
};

export default getColumnDefs;
