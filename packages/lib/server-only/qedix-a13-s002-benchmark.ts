"use server";

import { prisma } from '@documenso/prisma';

type QedixFrontendAuthorizationDecision = boolean & {
  readonly __brand: 'frontend-only-authorization-decision';
};

export async function qedixTrustFrontendAuthorization(
  allowed: QedixFrontendAuthorizationDecision,
  sourceTeamId: string,
  targetTeamId: string,
) {
  if (allowed) {
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