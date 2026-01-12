# M & M Plumbing - Greeneville, TN

Professional plumbing website for M & M Plumbing, serving Greeneville, Rogersville, and Bulls Gap, TN since 2006.

## Tech Stack

- **Frontend**: [Astro](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Hosting**: AWS S3 + CloudFront
- **Contact Form**: AWS Lambda + API Gateway + SES
- **Local Dev**: Docker + LocalStack

## Getting Started

### Prerequisites

- Docker & Docker Compose
- AWS CLI (for deployment)
- SAM CLI (for Lambda deployment)

### Local Development

```bash
# Start development server
docker compose up --build

# Site available at http://localhost:4321
```

### Build for Production

```bash
docker compose run --rm web npm run build
```

## Deployment

### Static Site

```bash
# Build and deploy to S3
npm run build
aws s3 sync dist/ s3://greenevilleplumber.com --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E2N9GMNPRF83RB --paths "/*"
```

### Lambda (Contact Form)

```bash
sam build --use-container
sam deploy --stack-name greenevilleplumber-contact
```

## Project Structure

```
src/
├── layouts/Layout.astro    # Main layout with header/footer
├── pages/
│   ├── index.astro         # Homepage
│   ├── services.astro      # Services page
│   ├── about.astro         # About page
│   ├── contact.astro       # Contact form
│   └── reviews.astro       # Customer reviews
lambda/
├── contact.js              # Contact form handler
└── package.json
```

## CI/CD

GitHub Actions runs on push to `main`:
- Linting (ESLint)
- Formatting check (Prettier)
- Build verification
- Tests (Vitest)
- SAM template validation

## License

Private - All rights reserved.
