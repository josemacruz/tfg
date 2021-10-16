import colors from "../../configuration/colors";

export const widgetConfiguration =  {
  id: 'widget:issues',
  config: {
    appearance: {
      hidden: ['orderType', 'subFamily'],
    },
    colors: {
      headerColor: colors['ui-White'],
      headerTableBackground: colors['ui-White'],
      headerTableColorText: colors['ui-Black'],
    },
    conditions: [
    ],
    labels: {
      alias: {
        date: 'date',
        category: 'category',
        family: 'family',
        subFamily: 'subFamily',
        orderType: 'orderType',
        description: 'description',
        status: 'status',
        criticality: 'criticality',
      },
    },
  }
};