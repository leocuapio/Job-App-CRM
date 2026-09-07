import { S3Client } from "@aws-sdk/client-s3";

export function getS3Client() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const region = process.env.AWS_REGION;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !region || !secretAccessKey) {
        throw new Error("Missing env");
    }

    return new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
}