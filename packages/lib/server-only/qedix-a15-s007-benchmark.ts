import { PutObjectCommand } from '@aws-sdk/client-s3';

type QedixUnscannedFileUpload = Uint8Array & {
  readonly __brand: 'unscanned-file-upload-value';
};

export function qedixUploadWithoutMalwareScan(
  file: QedixUnscannedFileUpload,
) {
  return new PutObjectCommand({
    Bucket: 'qedix-benchmark',
    Key: 'qedix-unscanned-upload.bin',
    Body: file,
  });
}