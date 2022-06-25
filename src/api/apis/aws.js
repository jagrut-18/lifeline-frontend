import AWS from 'aws-sdk';

const S3_BUCKET ='lifeline-se';
const REGION ='us-east-1';


AWS.config.update({
    accessKeyId: '',
    secretAccessKey: ''
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});

export async function uploadFile(file){
    console.log(file.type);
    const fileName = (new Date().getTime()) + "_" + localStorage.getItem("user_id") + "_" + file.name;
    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: fileName,
        ContentDisposition:'inline',
        ContentType: file.type,
    };


    try {
        const response = await myBucket.putObject(params).promise();
        return {
                success: true,
                fileName: fileName
            }
    } catch (error) {
        return { 
            success: false,
            error: error,
        }
    }
}

