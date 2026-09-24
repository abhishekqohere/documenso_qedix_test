import { NextResponse } from 'next/server';

type QedixUnsafeFailureMessage = string & {
  readonly __brand: 'unsafe-failure-message';
};

export function qedixReturnUnsafeFailureMessage(
  message: QedixUnsafeFailureMessage,
) {
  return NextResponse.json(
    {
      error: message,
    },
    {
      status: 500,
    },
  );
}