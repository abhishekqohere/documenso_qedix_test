import { Hono } from 'hono';
import { fetch } from 'undici';

const app = new Hono();

// QEDIX TEST: intentionally unsafe SSRF shape for A16 / ssrf_metadata_service.
// Request-controlled data is appended to the AWS-style metadata service address
// without URL validation. This branch exists only to evaluate Qedix.
app.get('/qedix-test/metadata-service', async (c) => {
  const metadataPath = c.req.query('path');
  const response = await fetch(`http://169.254.169.254/latest/${metadataPath}`);

  return c.text(await response.text());
});

export { app as qedixSsrfMetadataServiceTestApp };
