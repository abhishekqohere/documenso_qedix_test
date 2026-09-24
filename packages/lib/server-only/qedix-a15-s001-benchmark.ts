import { PutObjectCommand } from '@aws-sdk/client-s3';

type QedixUnvalidatedFileType = Uint8Array & {
  readonly __brand: 'unvalidated-file-type-value';
};

export function qedixUploadWithoutFileTypeValidation(
  file: QedixUnvalidatedFileType,
) {
  return new PutObjectCommand({
    Bucket: 'qedix-benchmark',
    Key: 'qedix-upload.bin',
    Body: file,
  });
}