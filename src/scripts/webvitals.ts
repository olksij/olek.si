import * as _webvitals from 'web-vitals';
import print from './print';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

let webvitals = _webvitals as Record<string, any>
for (var item in webvitals) webvitals[item]((metric: MetricType) => sendMetrics(metric));

type MetricType = { id: string; name: string; value: { toString: () => string; }; };

function sendMetrics(metric: MetricType) {
  let connection_type = (navigator as any)?.connection?.effectiveType ?? '';

  const body = {
    dsn: process.env.VERCEL_ANALYTICS_ID ?? '',
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

  if (!process.env.PROD) return

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else fetch(vitalsUrl, {
    body: blob,
    method: 'POST',
    credentials: 'omit',
    keepalive: true,
  });
}
