/**
 * QEDIX TEST: intentionally performs fixed-millisecond day arithmetic
 * on a platform temporal value and feeds the result into a comparison.
 *
 * Area: A39 - Numeric & temporal correctness
 * Expected subtype: dst_boundary_arithmetic
 *
 * Adding exactly 86,400,000 ms assumes every local calendar day is 24 hours,
 * which can be wrong across daylight-saving transitions.
 *
 * This file exists only to evaluate Qedix and must never be deployed.
 */
export function isAfterQedixOneDayBoundary(referenceTime: number): boolean {
  const now = Date.now();
  const oneDayLater = now + 86400000;

  return oneDayLater > referenceTime;
}
