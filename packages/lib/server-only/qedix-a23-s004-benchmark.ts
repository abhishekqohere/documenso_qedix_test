import { NextResponse } from 'next/server';

type QedixInternalId = string & {
  readonly __brand: 'internal-id';
};

export function qedixExposeInternalId(
  id: QedixInternalId,
) {
  return NextResponse.json({
    id,
  });
}