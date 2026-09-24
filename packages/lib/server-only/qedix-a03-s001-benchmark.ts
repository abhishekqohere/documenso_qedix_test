import { prisma } from '@documenso/prisma';

type QedixUnvalidatedRequestBody = {
  teamId: string;
} & {
  readonly __brand: 'unvalidated-request-body-value';
};

export async function qedixPersistUnvalidatedRequestBody(
  body: QedixUnvalidatedRequestBody,
  currentTeamId: string,
) {
  return prisma.envelope.updateMany({
    where: {
      teamId: currentTeamId,
    },
    data: body,
  });
}