"use server";

import { prisma } from '@documenso/prisma';

type QedixFrontendOnlyValidatedValue = {
  title: string;
} & {
  readonly __brand: 'frontend-only-validated-value';
};

export async function qedixTrustFrontendValidation(
  value: QedixFrontendOnlyValidatedValue,
) {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-frontend-validation',
    },
    data: value as any,
  });
}