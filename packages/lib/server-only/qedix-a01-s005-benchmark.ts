import { prisma } from '@documenso/prisma';

type QedixPrincipalUserId = string & {
  readonly __brand: 'principal-user-id';
};

type QedixResourceOwnerUserId = string & {
  readonly __brand: 'resource-owner-user-id';
};

export async function qedixMutateAnotherUsersResource(
  principal: QedixPrincipalUserId,
  owner: QedixResourceOwnerUserId,
) {
  // @ts-ignore Qedix benchmark intentionally compares distinct nominal identities.
  if (owner !== principal) {
    return prisma.envelope.updateMany({
      where: {
        ownerId: owner,
      } as any,
      data: {
        title: 'qedix-non-owner-write',
      } as any,
    });
  }
}