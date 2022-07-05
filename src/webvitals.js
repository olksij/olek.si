import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function sendMetrics(metric) {
  let connection_type = 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection'] ? navigator['connection']['effectiveType'] : '';

  const body = {
    dsn: process.env.VERCEL_ANALYTICS_ID,
    id: metric.id,
    page: location.href,
    href: location.href,
    event_name: metric.name, // TTFB
    value: metric.value.toString(), // 60.20000000298023
    speed: connection_type, // 4g
  };

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

  //console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob);
  } else
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true,
    });
}

[getFID, getTTFB, getLCP, getCLS, getFCP].forEach((get) => get((metric) => sendMetrics(metric)));
