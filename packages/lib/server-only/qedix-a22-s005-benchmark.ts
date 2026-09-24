import pino from 'pino';

type QedixCorrelationIdMissing = boolean & {
  readonly __brand: 'correlation-id-missing';
};

const qedixLogger = pino();

export function qedixLogWithoutCorrelationId(
  missing: QedixCorrelationIdMissing,
) {
  if (missing) {
    qedixLogger.info({
      event: 'qedix-request',
    });
  }
}