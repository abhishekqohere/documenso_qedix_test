import { exec } from 'node:child_process';
import { Hono } from 'hono';

const app = new Hono();

// QEDIX TEST: intentionally unsafe command-injection shape for
// A36 / command_injection.
// Request-controlled query data is interpolated directly into a shell command.
// This branch exists only to evaluate Qedix and must never be deployed.
app.get('/qedix-test/command-injection', (c) => {
  const target = c.req.query('target');

  if (!target) {
    return c.text('Missing target', 400);
  }

  exec(`echo ${target}`);

  return c.text('Command started');
});

export { app as qedixCommandInjectionTestApp };
