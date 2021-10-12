import React from 'react';
import { FormattedMessage } from 'react-intl';

export const filterList = [
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.date" />,
    value: 'dateCreated',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.categories" />,
    value: 'category',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.family" />,
    value: 'family',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.subfamily" />,
    value: 'subFamily',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.ordertype" />,
    value: 'orderType',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.status" />,
    value: 'status',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.severity" />,
    value: 'criticality',
  },
  {
    label: <FormattedMessage id="widgetIssues.wizard.filters.source" />,
    value: 'source',
  },
];

export const sources = [
  {
    label: <FormattedMessage id="issues.source.application" />,
    id: 1,
    value: 'app-mobile',
  },
  {
    label: <FormattedMessage id="issues.source.rule" />,
    id: 2,
    value: 'rule',
  },
  {
    label: <FormattedMessage id="issues.source.platform" />,
    id: 3,
    value: 'web-application',
  },
];
