import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals';

function sendMetrics(metric, options) {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path,
  );

  let connection_type = 'connection' in navigator && navigator['connection'] && 'effectiveType' in navigator['connection'] ? navigator['connection']['effectiveType'] : '';

  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page, // /blog/[slug]
    href: location.href, // https://oleksii.xyz/blog/my-test
    event_name: metric.name, // TTFB
    value: metric.value.toString(), // 60.20000000298023
    speed: connection_type, // 4g
  };

  if (options.debug) {
    console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded',
  });

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

try {
  let options = process.env.VERCEL_ANALYTICS_ID;
  [getFID, getTTFB, getLCP, getCLS, getFCP].forEach((fun) => fun((metric) => sendMetrics(metric, options)));
} catch (err) {
  console.error('[Web vitals]', err);
}
