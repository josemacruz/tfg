import React from 'react';
import { FormattedMessage } from 'react-intl';

export const filterList = {
  dateCreated: <FormattedMessage id="widgetIssues.wizard.filters.date" />,
  category: <FormattedMessage id="widgetIssues.wizard.filters.categories" />,
  family: <FormattedMessage id="widgetIssues.wizard.filters.family" />,
  subFamily: <FormattedMessage id="widgetIssues.wizard.filters.subfamily" />,
  orderType: <FormattedMessage id="widgetIssues.wizard.filters.ordertype" />,
  status: <FormattedMessage id="widgetIssues.wizard.filters.status" />,
  criticality: <FormattedMessage id="widgetIssues.wizard.filters.severity" />,
  source: <FormattedMessage id="widgetIssues.wizard.filters.source" />,
};

export const categories = {
    other: "other",
    luminaire: "luminaire",
    "waste-container": "waste-container",
    "weather-station": "weather-station",
    "environmental-quality": "environmental-quality",
    gps: "gps",
    parking: "parking",
    "electric-panel": "electric-panel",
    health: "health",
    videocamera: "videocamera",
    "electric-meter": "electric-meter",
    "water-meter": "water-meter",
    irrigation: "irrigation",
}

export const family = {

}

export const subFamily = {

}

export const orderType = {
  "vehicle-broken-down": "vehicle-broken-down",
  "vehicle-out-of-petrol": "vehicle-out-of-petrol",
}

export const status = {
  open: "open",
  close: "close",
  "in-progress": "in-progress",
}

export const criticality = {
  low: 'low',
  high: 'high',
  medium: 'medium',
}
