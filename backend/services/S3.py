import os
import boto3


class S3:

    instance = None
    bucket = None

    def __init__(self):
        pass

    @staticmethod
    def initialize():
        session = boto3.session.Session()
        S3.instance = session.client(
            's3',
            region_name='nyc3',
            endpoint_url='https://nyc3.digitaloceanspaces.com',
            aws_access_key_id=os.getenv('SPACES_KEY'),
            aws_secret_access_key=os.getenv('SPACES_SECRET')
        )
        S3.bucket = os.getenv('SPACES_BUCKET')

    @staticmethod
    def upload(filename, data, public=True):
        extra_args = {'ACL': 'public-read'} if public else {}
        S3.instance.upload_fileobj(data, S3.bucket, filename, ExtraArgs=extra_args)

    @staticmethod
    def delete(filename):
        S3.instance.delete_object(Bucket=S3.bucket, Key=filename)
