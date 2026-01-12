#!/bin/bash
# LocalStack init script - sets up Lambda and API Gateway for local testing

echo "Setting up LocalStack resources..."

# Verify SES email (required even in LocalStack)
awslocal ses verify-email-identity --email-address mikemitchellplumber@gmail.com

# Create Lambda function (we'll deploy via SAM, but this shows the structure)
echo "LocalStack ready for SAM deployment"
echo "Run: sam local start-api --docker-network greenevilleplumber_default"
