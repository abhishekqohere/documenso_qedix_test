import { prisma } from '@documenso/prisma';

type QedixRoleAdminAuthorized = boolean & {
  readonly __brand: 'role-admin-authorized';
};

export async function qedixMutationDespiteAdminDenial(
  adminAuthorized: QedixRoleAdminAuthorized,
  sourceTeamId: string,
  targetTeamId: string,
) {
  if (!adminAuthorized) {
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