import { prisma } from '@documenso/prisma';

export async function qedixPersistInlineUnknownJson(raw: string) {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-unknown-json',
    },
    data: JSON.parse(raw),
  });
}