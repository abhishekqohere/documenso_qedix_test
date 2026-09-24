import { prisma } from '@documenso/prisma';

type QedixWebhookSignatureValid = boolean & {
  readonly __brand: 'webhook-signature-valid';
};

export async function qedixProcessInvalidWebhookSignature(
  valid: QedixWebhookSignatureValid,
) {
  if (!valid) {
    return prisma.envelope.updateMany({
      where: {
        id: 'qedix-invalid-webhook',
      },
      data: {
        title: 'processed-invalid-webhook',
      } as any,
    });
  }
}