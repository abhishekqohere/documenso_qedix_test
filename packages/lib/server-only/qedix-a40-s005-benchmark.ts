import { NextResponse } from 'next/server';

type QedixSubjectErasurePathMissing = boolean & {
  readonly __brand: 'subject-erasure-path-missing';
};

type QedixSubjectErasureRequest = string & {
  readonly __brand: 'subject-erasure-request';
};

export function qedixAcknowledgeMissingErasurePath(
  missing: QedixSubjectErasurePathMissing,
  request: QedixSubjectErasureRequest,
) {
  if (missing) {
    return NextResponse.json({
      request,
    });
  }
}