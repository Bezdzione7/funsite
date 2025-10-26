import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { processImage } from './image.js';

// S3 is disabled for now - no environment variables needed
let s3Client: S3Client | null = null;
let bucketName: string | null = null;

export async function generatePresignedUrl(key: string, contentType: string): Promise<string> {
    throw new Error('S3 not configured - file uploads disabled');
}

export async function deleteObject(key: string): Promise<void> {
    throw new Error('S3 not configured - file operations disabled');
}

export async function generateDownloadUrl(key: string): Promise<string> {
    throw new Error('S3 not configured - file operations disabled');
}

export async function uploadProfilePicture(
    identifier: string,
    body: Uint8Array,
    contentType: string,
): Promise<string> {
    throw new Error('S3 not configured - file uploads disabled');
}

export async function uploadCoinIcon(
    coinSymbol: string,
    body: Uint8Array,
    contentType: string,
): Promise<string> {
    throw new Error('S3 not configured - file uploads disabled');
}

export { s3Client };