import { prisma } from '@documenso/prisma';

export async function qedixStoreTimestampWithoutTimezone() {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-timezone',
    },
    data: {
      createdAt: new Date().toISOString().slice(0, 19),
    } as any,
  });
}