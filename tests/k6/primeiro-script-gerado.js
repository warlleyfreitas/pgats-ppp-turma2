import http from 'k6/http';
import { expect } from 'https://jslib.k6.io/k6-expect/0.0.2/index.js';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  let res = http.get('https://quickpizza.grafana.com');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'status text is OK': (r) => r.status_text === 'OK',
  });

  expect.soft(res.status).toBe(200);
  expect.soft(res.status_text).toBe('OK');

  sleep(1);
}
