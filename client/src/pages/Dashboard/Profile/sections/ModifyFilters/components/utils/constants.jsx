import React from 'react';
import { FormattedMessage } from 'react-intl';

export const filterList = {
  dateCreated: <FormattedMessage id="issue.list.date" />,
  category: <FormattedMessage id="issue.list.category" />,
  family: <FormattedMessage id="issue.list.family" />,
  subFamily: <FormattedMessage id="issue.list.subFamily" />,
  orderType: <FormattedMessage id="issue.list.orderType" />,
  status: <FormattedMessage id="issue.list.status" />,
  criticality: <FormattedMessage id="issue.list.criticality" />,
};

export const categories = {
    other: <FormattedMessage id="issue.list.other" />,
    luminaire: <FormattedMessage id="issue.list.luminaire" />,
    "waste-container": <FormattedMessage id="issue.list.waste-container" />,
    "weather-station": <FormattedMessage id="issue.list.weather-station" />,
    "environmental-quality": <FormattedMessage id="issue.list.environmental-quality" />,
    gps: <FormattedMessage id="issue.list.gps" />,
    parking: <FormattedMessage id="issue.list.parking" />,
    "electric-panel": <FormattedMessage id="issue.list.electric-panel" />,
    health: <FormattedMessage id="issue.list.health" />,
    videocamera: <FormattedMessage id="issue.list.videocamera" />,
    "electric-meter": <FormattedMessage id="issue.list.electric-meter" />,
    "water-meter": <FormattedMessage id="issue.list.water-meter" />,
    irrigation: <FormattedMessage id="issue.list.irrigation" />,
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
  open: <FormattedMessage id="issue.list.open" />,
  close: <FormattedMessage id="issue.list.close" />,
  "in-progress": <FormattedMessage id="issue.list.in-progress" />,
}

export const criticality = {
  low: <FormattedMessage id="issue.list.low" />,
  high: <FormattedMessage id="issue.list.high" />,
  medium: <FormattedMessage id="issue.list.medium" />,
}
