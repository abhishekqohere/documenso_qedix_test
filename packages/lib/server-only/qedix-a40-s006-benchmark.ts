import { NextResponse } from 'next/server';

type QedixPortabilityExportPathMissing = boolean & {
  readonly __brand: 'portability-export-path-missing';
};

type QedixDataPortabilityRequest = string & {
  readonly __brand: 'data-portability-request';
};

export function qedixAcknowledgeMissingPortabilityExport(
  missing: QedixPortabilityExportPathMissing,
  request: QedixDataPortabilityRequest,
) {
  if (missing) {
    return NextResponse.json({
      request,
    });
  }
}