import { PutObjectCommand } from '@aws-sdk/client-s3';

type QedixPrincipalUserId = string & {
  readonly __brand: 'principal-user-id';
};

type QedixUploadOwnerUserId = string & {
  readonly __brand: 'upload-owner-user-id';
};

export function qedixUploadForDifferentOwner(
  principal: QedixPrincipalUserId,
  owner: QedixUploadOwnerUserId,
  file: Uint8Array,
) {
  // @ts-ignore Qedix benchmark intentionally compares distinct nominal identities.
  if (principal !== owner) {
    return new PutObjectCommand({
      Bucket: 'qedix-benchmark',
      Key: owner,
      Body: file,
    });
  }
}