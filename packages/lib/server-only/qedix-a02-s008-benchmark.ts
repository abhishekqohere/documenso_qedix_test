import { prisma } from '@documenso/prisma';

type QedixPasswordResetTokenFilter = {
  token: string;
} & {
  readonly __brand: 'password-reset-token-filter';
};

type QedixPasswordResetTokenExpired = boolean & {
  readonly __brand: 'password-reset-token-expired';
};

export async function qedixLookupExpiredResetToken(
  filter: QedixPasswordResetTokenFilter,
  expired: QedixPasswordResetTokenExpired,
) {
  if (expired) {
    return prisma.envelope.findMany({
      where: filter as any,
      take: 1,
    });
  }
}