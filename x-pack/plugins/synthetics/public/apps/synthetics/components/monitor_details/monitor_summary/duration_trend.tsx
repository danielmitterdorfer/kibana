/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { useKibana } from '@kbn/kibana-react-plugin/public';
import { ClientPluginsStart } from '../../../../../plugin';
import { useMonitorQueryId } from '../hooks/use_monitor_query_id';
import { useSelectedLocation } from '../hooks/use_selected_location';

interface MonitorDurationTrendProps {
  from: string;
  to: string;
}

export const MonitorDurationTrend = (props: MonitorDurationTrendProps) => {
  const { observability } = useKibana<ClientPluginsStart>().services;

  const { ExploratoryViewEmbeddable } = observability;

  const monitorId = useMonitorQueryId();
  const selectedLocation = useSelectedLocation();

  const metricsToShow = ['min', 'max', 'median', '25th', '75th'];

  if (!selectedLocation) {
    return null;
  }

  return (
    <ExploratoryViewEmbeddable
      customHeight="240px"
      reportType="kpi-over-time"
      attributes={metricsToShow.map((metric) => ({
        dataType: 'synthetics',
        time: props,
        name: metric + ' Series',
        selectedMetricField: 'monitor.duration.us',
        reportDefinitions: {
          'monitor.id': [monitorId],
          'observer.geo.name': [selectedLocation?.label],
        },
        seriesType: 'line',
        operationType: metric,
      }))}
    />
  );
};
