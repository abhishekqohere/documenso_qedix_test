import pino from 'pino';

type QedixAuditLogRetentionIndefinite = boolean & {
  readonly __brand: 'audit-log-retention-indefinite';
};

type QedixPiiValue = string & {
  readonly __brand: 'pii-value';
};

const qedixAuditLogger = pino();

export function qedixLogPiiIndefinitely(
  indefinite: QedixAuditLogRetentionIndefinite,
  pii: QedixPiiValue,
) {
  if (indefinite) {
    qedixAuditLogger.info({
      email: pii,
    });
  }
}