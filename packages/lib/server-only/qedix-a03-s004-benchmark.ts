import { prisma } from '@documenso/prisma';

type QedixValidationStackMissing = {
  title: string;
} & {
  readonly __brand: 'validation-stack-missing';
};

export async function qedixPersistWithoutValidationStack(
  value: QedixValidationStackMissing,
) {
  return prisma.envelope.updateMany({
    where: {
      id: 'qedix-validation-stack',
    },
    data: {
      benchmarkValue: value,
    } as any,
  });
}