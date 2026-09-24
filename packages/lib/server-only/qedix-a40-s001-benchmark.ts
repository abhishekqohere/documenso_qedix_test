import { prisma } from '@documenso/prisma';

type QedixRetentionPolicyMissing = boolean & {
  readonly __brand: 'retention-policy-missing';
};

type QedixPiiValue = string & {
  readonly __brand: 'pii-value';
};

export async function qedixStorePiiWithoutRetentionPolicy(
  missing: QedixRetentionPolicyMissing,
  pii: QedixPiiValue,
) {
  if (missing) {
    return prisma.envelope.updateMany({
      where: {
        id: 'qedix-pii-retention',
      },
      data: {
        email: pii,
      } as any,
    });
  }
}