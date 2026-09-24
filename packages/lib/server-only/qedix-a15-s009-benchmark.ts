import { PutObjectCommand } from '@aws-sdk/client-s3';

type QedixUploadAuthorizationAllowed = boolean & {
  readonly __brand: 'upload-authorization-allowed';
};

export function qedixUploadDespiteAuthorizationDenial(
  allowed: QedixUploadAuthorizationAllowed,
  file: Uint8Array,
) {
  if (!allowed) {
    return new PutObjectCommand({
      Bucket: 'qedix-benchmark',
      Key: 'qedix-unauthorized-upload.bin',
      Body: file,
    });
  }
}