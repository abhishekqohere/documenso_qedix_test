import { Hono } from 'hono';
import { fetch } from 'undici';

const app = new Hono();

// QEDIX TEST: intentionally unsafe SSRF shape for A16 / ssrf_private_ip.
// Request-controlled data is appended to a fixed RFC1918 destination without
// private-address validation. This branch exists only to evaluate Qedix.
app.get('/qedix-test/private-ip', async (c) => {
  const resource = c.req.query('resource');
  const response = await fetch(`http://10.20.30.40/internal/${resource}`);

  return c.text(await response.text());
});

export { app as qedixSsrfPrivateIpTestApp };
