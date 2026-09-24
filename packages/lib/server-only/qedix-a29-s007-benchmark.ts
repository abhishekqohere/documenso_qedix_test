import { prisma } from '@documenso/prisma';

type QedixInventoryCount = number & {
  readonly __brand: 'inventory-count';
};

export async function qedixPersistNegativeInventory() {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-negative-inventory',
    },
    data: {
      benchmarkInventory: -2 as QedixInventoryCount,
    } as any,
  });
}