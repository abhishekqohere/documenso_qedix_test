import { prisma } from '@documenso/prisma';

type QedixBalance = number & {
  readonly __brand: 'balance';
};

export async function qedixPersistNegativeBalance() {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-negative-balance',
    },
    data: {
      benchmarkBalance: -1 as QedixBalance,
    } as any,
  });
}