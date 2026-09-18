import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'node:fs';

/**
 * QEDIX TEST ONLY.
 *
 * This route intentionally contains production-safety regressions so Qedix can
 * be evaluated against a real pull request.
 *
 * DO NOT MERGE OR DEPLOY.
 *
 * Runtime execution is disabled unless QEDIX_TEST_ONLY=1.
 */
export const action = async ({ request }: { request: Request }) => {
  if (process.env.QEDIX_TEST_ONLY !== '1') {
    return new Response('Qedix test route disabled', { status: 404 });
  }

  // INTENTIONAL: request body trusted without runtime validation.
  const payload = (await request.json()) as {
    callbackUrl?: string;
    expression?: string;
    filePath?: string;
    documentIds?: unknown[];
    sqlId?: string | number;
  };

  // QEDIX TEST: request-controlled outbound URL + no timeout.
  const callbackUrl = String(payload.callbackUrl ?? '');
  await fetch(callbackUrl);

  // QEDIX TEST: request-controlled text reaches a code interpreter.
  const expression = String(payload.expression ?? '');
  eval(expression);

  // QEDIX TEST: synchronous filesystem operation in a request handler.
  const filePath = String(payload.filePath ?? '');
  readFileSync(filePath, 'utf8');

  const prisma = new PrismaClient();

  // QEDIX TEST: database read inside a request-controlled loop (N+1).
  const documentIds = Array.isArray(payload.documentIds)
    ? payload.documentIds
    : [];

  for (const _documentId of documentIds) {
    await prisma.user.findMany({});
  }

  // QEDIX TEST: request input interpolated into unsafe raw SQL.
  const sqlId = String(payload.sqlId ?? '');

  await prisma.$queryRawUnsafe(
    `SELECT * FROM "User" WHERE id = '${sqlId}'`,
  );

  await prisma.$disconnect();

  return Response.json({ ok: true });
};
