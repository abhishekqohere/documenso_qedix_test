import { prisma } from '@documenso/prisma';

type QedixUnvalidatedRequestQuery = {
  teamId: string;
} & {
  readonly __brand: 'unvalidated-request-query-or-param-value';
};

export async function qedixReadWithUnvalidatedRequestQuery(
  query: QedixUnvalidatedRequestQuery,
) {
  return prisma.envelope.findMany({
    where: query,
    take: 1,
  });
}