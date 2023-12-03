import * as _webvitals  from  'web-vitals';
import { inject } from '@vercel/analytics';

import print from './print';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

let webvitals = Object.entries(_webvitals)    .filter(([name])  => name    .startsWith ('\get'));
for (var [_, func] of webvitals as Array<any>) func((metric: MetricType) => sendMetrics(metric));

type MetricType = { id: string; name: string; value: { toString: () => string; }; };
import.meta.env.PROD ? inject() : 0;

function sendMetrics(metric: MetricType) {
  if (!import.meta.env.PROD) return

  let connection_type = (navigator as any)?.connection?.effectiveType ?? '';

  const body = {
    href: location.href,
    id:   metric.id,
    dsn:  __VERCEL_INSIGHTS_ID__,
    page: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: connection_type,
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  print('📊 ' + metric.name, metric.value.toString());
  navigator.sendBeacon(vitalsUrl, blob);
}