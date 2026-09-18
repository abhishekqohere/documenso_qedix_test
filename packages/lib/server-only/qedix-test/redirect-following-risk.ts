import { Hono } from 'hono';
import { fetch } from 'undici';

const app = new Hono();

// QEDIX TEST: intentionally unsafe redirect-following shape for
// A16 / redirect_following_risk.
// A request-controlled URL is fetched with redirect following explicitly enabled.
// This branch exists only to evaluate Qedix and must never be deployed.
app.get('/qedix-test/redirect-following', async (c) => {
  const target = c.req.query('url');

  if (!target) {
    return c.text('Missing url', 400);
  }

  const response = await fetch(target, { redirect: 'follow' });

  return c.text(await response.text());
});

export { app as qedixRedirectFollowingRiskTestApp };
