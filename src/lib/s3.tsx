import {
  PutObjectCommand,
  GetObjectCommand,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const SIGNED_URL_EXPIRE_TIME = Number(
  process.env.SIGNED_URL_EXPIRE_TIME ?? '1800',
)

// Initialize S3 client for Supabase Storage
const s3Client = new S3Client({
  region: process.env.SUPABASE_REGION, // Your Supabase project's region e.g. "us-east-1"
  endpoint: process.env.SUPABASE_STORAGE_URL ?? '',
  credentials: {
    // These credentials can be found in your supabase storage settings, under 'S3 access keys'
    accessKeyId: process.env.SUPABASE_ACCESS_KEY ?? '',
    secretAccessKey: process.env.SUPABASE_SECRET_KEY ?? '',
  },
})

export const uploadFileToS3 = async (
  file: File,
  file_key: string,
): Promise<PutObjectOutput> => {
  try {
    const fileBuffer = await file.arrayBuffer()

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_NAME ?? '',
      Key: file_key, // Unique filename to avoid conflicts
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
    })
    // Upload the video directly to Supabase Storage
    const uploaded_file = await s3Client.send(putObjectCommand)
    return uploaded_file
  } catch (error) {
    throw error
  }
}

export const getSingedUrl = async (
  filename: string,
  expiresIn: number = SIGNED_URL_EXPIRE_TIME,
): Promise<string> => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_NAME ?? '',
      Key: filename,
    })

    // Generate the signed URL (expires in default of 1 hour)
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn,
    })

    return signedUrl
  } catch (error) {
    throw error
  }
}
