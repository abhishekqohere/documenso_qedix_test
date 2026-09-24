"use server";

import { prisma } from '@documenso/prisma';

type QedixSessionAuthenticated = boolean & {
  readonly __brand: 'session-authenticated';
};

export async function qedixUnauthenticatedServerAction(
  authenticated: QedixSessionAuthenticated,
  sourceTeamId: string,
  targetTeamId: string,
) {
  if (!authenticated) {
    return prisma.envelope.updateMany({
      where: {
        teamId: sourceTeamId,
      },
      data: {
        teamId: targetTeamId,
      },
    });
  }
}