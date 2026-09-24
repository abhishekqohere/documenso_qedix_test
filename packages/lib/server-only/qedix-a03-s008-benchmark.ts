"use server";

import { prisma } from '@documenso/prisma';

export async function qedixPersistRawFormData(
  form: FormData,
  currentTeamId: string,
) {
  return prisma.envelope.updateMany({
    where: {
      teamId: currentTeamId,
    },
    data: {
      teamId: form.get('teamId'),
    } as any,
  });
}