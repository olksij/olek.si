import * as webvitals from 'web-vitals';
import print from './print';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

for (var item in webvitals) webvitals[item]((metric) => sendMetrics(metric));

function sendMetrics(metric) {
  let connection_type = 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection'] ? navigator['connection']['effectiveType'] : '';

  const body = {
    dsn: import.meta.env.VERCEL_ANALYTICS_ID,
    id: metric.id,
    page: location.href,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: connection_type,
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  print('📊 ' + metric.name, metric.value.toString());

  if (import.meta.env.DEV) return

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else fetch(vitalsUrl, {
    body: blob,
    method: 'POST',
    credentials: 'omit',
    keepalive: true,
  });
}
