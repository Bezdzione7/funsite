import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { processImage } from './image.js';

// Optional S3 configuration - only initialize if environment variables are present
let s3Client: S3Client | null = null;
let bucketName: string | null = null;

try {
    const { PRIVATE_B2_KEY_ID, PRIVATE_B2_APP_KEY } = await import('$env/static/private');
    const { PUBLIC_B2_BUCKET, PUBLIC_B2_ENDPOINT, PUBLIC_B2_REGION } = await import('$env/static/public');
    
    if (PRIVATE_B2_KEY_ID && PRIVATE_B2_APP_KEY && PUBLIC_B2_BUCKET && PUBLIC_B2_ENDPOINT && PUBLIC_B2_REGION) {
        bucketName = PUBLIC_B2_BUCKET;
        s3Client = new S3Client({
            endpoint: PUBLIC_B2_ENDPOINT,
            region: PUBLIC_B2_REGION,
            credentials: {
                accessKeyId: PRIVATE_B2_KEY_ID,
                secretAccessKey: PRIVATE_B2_APP_KEY
            },
            forcePathStyle: true,
            requestChecksumCalculation: 'WHEN_REQUIRED',
            responseChecksumValidation: 'WHEN_REQUIRED',
        });
    }
} catch (error) {
    // S3 configuration not available - this is optional
    console.log('S3 configuration not available - file uploads disabled');
}

export async function generatePresignedUrl(key: string, contentType: string): Promise<string> {
    if (!s3Client || !bucketName) {
        throw new Error('S3 not configured - file uploads disabled');
    }
    
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: contentType
    });

    return getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour
}

export async function deleteObject(key: string): Promise<void> {
    if (!s3Client || !bucketName) {
        throw new Error('S3 not configured - file operations disabled');
    }
    
    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key
    });

    await s3Client.send(command);
}

export async function generateDownloadUrl(key: string): Promise<string> {
    if (!s3Client || !bucketName) {
        throw new Error('S3 not configured - file operations disabled');
    }
    
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key
    });

    return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}

export async function uploadProfilePicture(
    identifier: string, // Can be user ID or a unique ID from social provider
    body: Uint8Array,
    contentType: string,
): Promise<string> {
    if (!s3Client || !bucketName) {
        throw new Error('S3 not configured - file uploads disabled');
    }
    
    if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(contentType.toLowerCase())) {
        throw new Error('Unsupported image format. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    const processedImage = await processImage(Buffer.from(body));
    
    const key = `avatars/${identifier}.webp`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: processedImage.buffer,
        ContentType: processedImage.contentType,
        ContentLength: processedImage.size,
    });

    await s3Client.send(command);
    return key;
}

export async function uploadCoinIcon(
    coinSymbol: string,
    body: Uint8Array,
    contentType: string,
): Promise<string> {
    if (!s3Client || !bucketName) {
        throw new Error('S3 not configured - file uploads disabled');
    }
    
    if (!contentType || !contentType.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(contentType.toLowerCase())) {
        throw new Error('Unsupported image format. Only JPEG, PNG, GIF, and WebP are allowed.');
    }

    const processedImage = await processImage(Buffer.from(body));

    const key = `coins/${coinSymbol.toLowerCase()}.webp`;

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: processedImage.buffer,
        ContentType: processedImage.contentType,
        ContentLength: processedImage.size,
    });

    await s3Client.send(command);
    return key;
}

export { s3Client };