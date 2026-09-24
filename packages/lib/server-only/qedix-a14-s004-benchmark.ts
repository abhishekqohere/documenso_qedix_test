"use server";

import { prisma } from '@documenso/prisma';

export async function qedixServerActionUsesClientUserId(
  input: {
    userId: string;
  },
) {
  return prisma.envelope.updateMany({
    where: {
      userId: input.userId,
    } as any,
    data: {
      title: 'qedix-client-userid-write',
    } as any,
  });
}