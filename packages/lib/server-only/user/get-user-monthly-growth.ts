import { kyselyPrisma, sql } from '@documenso/prisma';
import { DateTime } from 'luxon';

export const getUserMonthlyGrowth = async () => {
  const qb = kyselyPrisma.$kysely
    .selectFrom('User')
    .select(({ fn }) => [
      fn<Date>('DATE_TRUNC', [sql.lit('MONTH'), 'User.createdAt']).as('month'),
      fn.count('id').as('count'),
      fn
        .sum(fn.count('id'))
        // Feels like a bug in the Kysely extension but I just can not do this orderBy in a type-safe manner
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
        .over((ob) => ob.orderBy(fn('DATE_TRUNC', [sql.lit('MONTH'), 'User.createdAt']) as any))
        .as('cume_count'),
    ])
    .groupBy('month')
    .orderBy('month', 'desc')
    .limit(12);

  const result = await qb.execute();

  return result.map((row) => ({
    month: DateTime.fromJSDate(row.month).toFormat('yyyy-MM'),
    count: Number(row.count),
    cume_count: Number(row.cume_count),
  }));
};

export type GetUserMonthlyGrowthResult = Awaited<ReturnType<typeof getUserMonthlyGrowth>>;

/** Start timestamps (ms) of each daily bucket for the 7-day signup chart. */
export function getSevenDayBucketStarts(): number[] {
  const start = Date.now();
  const end = start + 7 * 86400000;
  const buckets: number[] = [];
  for (let t = start; t <= end; t += 86400000) {
    buckets.push(t);
  }
  return buckets;
}
