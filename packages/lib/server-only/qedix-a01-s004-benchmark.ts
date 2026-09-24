import { prisma } from '@documenso/prisma';

type QedixPermissionCheckAllowed = boolean & {
  readonly __brand: 'permission-check-allowed';
};

export async function qedixMutationDespitePermissionDenial(
  permissionAllowed: QedixPermissionCheckAllowed,
  sourceTeamId: string,
  targetTeamId: string,
) {
  if (!permissionAllowed) {
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