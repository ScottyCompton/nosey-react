#!/usr/bin/env bash

aws configure --profile nosey-staging set aws_access_key_id AKIAIXQIEI2LA7SIY2HQ
aws configure --profile nosey-staging set aws_secret_access_key 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
aws configure --profile nosey-staging set region us-west-2
aws configure --profile nosey-staging set output text

aws configure --profile nosey-prod set aws_access_key_id AKIAJYD6ZEDHHW6P53HQ
aws configure --profile nosey-prod set aws_secret_access_key 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
aws configure --profile nosey-prod set region us-west-2
aws configure --profile nosey-prod set output text
