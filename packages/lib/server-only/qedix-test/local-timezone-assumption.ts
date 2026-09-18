/**
 * QEDIX TEST: intentionally uses a process-local timezone Date API.
 *
 * Area: A39 - Numeric & temporal correctness
 * Expected subtype: local_timezone_assumption
 *
 * This file exists only to evaluate Qedix and must never be deployed.
 */
export function getQedixLocalCalendarDay(now = new Date()): number {
  return now.getDate();
}
