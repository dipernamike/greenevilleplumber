# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Greeneville Plumber website for M & M Plumbing - a licensed residential plumbing service company serving Greeneville and Rogersville, TN since 2006.

## Technology Stack

- **Framework**: Astro (static-first, zero JS by default)
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)
- **Local Dev**: Docker + LocalStack
- **Deployment**: AWS (S3 + CloudFront for static hosting)
- **Contact Form**: AWS Lambda + API Gateway + SES

## Development Commands

```bash
# Start local development (Astro + LocalStack)
make dev                     # or: docker compose up --build
                             # Site: http://localhost:4321
                             # LocalStack: http://localhost:4566

# Stop containers
make dev-down                # or: docker compose down

# Test Lambda locally (requires SAM CLI)
make test-lambda             # Invoke with test event
make local-api               # Start local API on port 3001

# Build for production
make build                   # or: docker compose run --rm web npm run build
```

## Domains

This site serves both domains (same content):
- **greenevilleplumber.com** - Primary domain
- **rogersvilleplumber.com** - Alternate domain

### CloudFront Multi-Domain Setup
1. Add both domains as alternate domain names (CNAMEs) in CloudFront
2. Create ACM certificate covering both domains (or wildcard)
3. Set up Route 53 hosted zones for both domains pointing to CloudFront

## Deployment

### Frontend (S3 + CloudFront)
```bash
npm run build
aws s3 sync dist/ s3://BUCKET_NAME --delete
aws cloudfront create-invalidation --distribution-id DIST_ID --paths "/*"
```

### Lambda (SAM)
```bash
cd lambda && npm install
sam build
sam deploy --guided          # First time - saves config to samconfig.toml
sam deploy                   # Subsequent deploys
```

### SES Setup (Required for contact form)
1. Verify sender email in SES console
2. If in sandbox, also verify recipient email
3. Request production access for real usage

## Architecture

```
src/
├── layouts/
│   └── Layout.astro         # Base layout (header, footer, nav)
├── components/              # Reusable Astro components
├── pages/
│   ├── index.astro          # Home
│   ├── services.astro       # Services listing
│   ├── about.astro          # About the company
│   └── contact.astro        # Contact form
└── styles/                  # Global styles (if needed)

lambda/
├── contact.js               # Contact form Lambda handler
└── package.json             # Lambda dependencies

public/                      # Static assets (favicon, images)
localstack/                  # LocalStack init scripts
events/                      # Lambda test events
```

## Environment Variables

### Frontend (Astro)
- `PUBLIC_API_URL` - API Gateway endpoint (set in docker-compose for local, build arg for prod)

### Lambda
- `TO_EMAIL` - Email to receive form submissions (default: mikemitchellplumber@gmail.com)
- `FROM_EMAIL` - Verified SES sender email (default: mikemitchellplumber@gmail.com)
- `ENVIRONMENT` - dev/prod

## Business Information

- **Company**: M & M Plumbing
- **Phone**: (423) 946-8310
- **Service Area**: Greeneville, Rogersville, Bulls Gap, TN
- **Established**: 2006
- **Related Site**: rogersvilleplumber.com

## Security Notes

- `.env` files are protected from Claude access
- AWS credentials should use IAM roles or environment variables
- `samconfig.toml` contains deployment config - protected from accidental reads
- Contact form has CORS configured for production domain
