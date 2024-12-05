const { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

require("dotenv").config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

module.exports = {
    uploadFile: async (fileBuffer, fileName, mimetype) => {
        const uploadParams = {
            Bucket: bucketName,
            Body: fileBuffer,
            Key: fileName,
            ContentType: mimetype
        }
        return await s3Client.send(new PutObjectCommand(uploadParams));
    },

    deleteFile: async(fileName) => {
        const deleteParams = {
            Bucket: bucketName,
            Key: fileName,
        }

        return await s3Client.send(new DeleteObjectCommand(deleteParams));
    },
}

