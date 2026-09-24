import { prisma } from '@documenso/prisma';

type QedixAdminActionAuthorized = boolean & {
  readonly __brand: 'admin-action-authorized';
};

type QedixAuditEventDisabled = boolean & {
  readonly __brand: 'audit-event-disabled';
};

export async function qedixAdminMutationWithoutAudit(
  admin: QedixAdminActionAuthorized,
  auditDisabled: QedixAuditEventDisabled,
) {
  if (admin) {
    if (auditDisabled) {
      return prisma.envelope.updateMany({
        where: {
          id: 'qedix-admin-audit',
        },
        data: {
          title: 'qedix-admin-change',
        } as any,
      });
    }
  }
}