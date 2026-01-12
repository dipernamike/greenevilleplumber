# User Story: M & M Plumbing Website

## Overview

**Project**: greenevilleplumber.com / rogersvilleplumber.com
**Client**: M & M Plumbing
**Date**: January 2026
**Status**: Development Complete, Pending Domain Setup

## Business Context

M & M Plumbing is a family-owned plumbing company established in 2006, serving the Greeneville, Rogersville, and Bulls Gap areas of Tennessee. They needed a professional web presence to:

- Showcase their services to local customers
- Provide easy contact options (phone, web form)
- Build trust through reviews and company history
- Serve both greenevilleplumber.com and rogersvilleplumber.com domains

## User Stories

### US-001: View Services
**As a** homeowner with a plumbing issue
**I want to** see what services M & M Plumbing offers
**So that** I can determine if they can help with my problem

**Acceptance Criteria:**
- Services page lists all offered services
- Each service has a description
- Services include: Drain Cleaning, Leak Detection, Water Heaters, Pipe Repair, New Construction, Fixture Installation

### US-002: Contact the Business
**As a** potential customer
**I want to** easily contact M & M Plumbing
**So that** I can request a quote or schedule service

**Acceptance Criteria:**
- Phone number prominently displayed in header and footer
- Click-to-call functionality on mobile
- Contact form for non-urgent inquiries
- Form submissions sent to business email via AWS SES

### US-003: Learn About the Company
**As a** homeowner evaluating plumbers
**I want to** learn about M & M Plumbing's history and values
**So that** I can trust them with my home

**Acceptance Criteria:**
- About page shows company history (established 2006)
- Service area clearly listed
- Company values/promises displayed

### US-004: Read Customer Reviews
**As a** potential customer
**I want to** read reviews from other customers
**So that** I can gauge the quality of their work

**Acceptance Criteria:**
- Reviews page displays customer testimonials
- Reviews show customer name, rating, and feedback
- Call-to-action to leave a Google review

### US-005: Mobile-Friendly Experience
**As a** mobile user
**I want to** easily navigate the site on my phone
**So that** I can find information and contact the plumber quickly

**Acceptance Criteria:**
- Responsive design works on all screen sizes
- Mobile menu toggles properly
- Click-to-call buttons work on mobile
- Text is readable without zooming

### US-006: Fast Page Loading
**As a** visitor with limited patience
**I want to** pages to load quickly
**So that** I don't leave the site out of frustration

**Acceptance Criteria:**
- Static site generation (no server-side rendering)
- CloudFront CDN for global delivery
- Minimal JavaScript (Astro zero-JS by default)
- Optimized CSS delivery

## Technical Implementation

### Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Astro | Static-first, zero JS by default, excellent SEO |
| Styling | Tailwind CSS | Rapid development, consistent design system |
| Hosting | S3 + CloudFront | Low cost, high availability, global CDN |
| Contact Form | Lambda + SES | Serverless, pay-per-use, no server maintenance |
| Local Dev | Docker + LocalStack | Consistent environment, AWS service emulation |

### Infrastructure

- **S3 Bucket**: Static file hosting
- **CloudFront**: CDN with custom URL rewriting function
- **Lambda**: Contact form handler
- **API Gateway**: REST API for form submissions
- **SES**: Email delivery for contact form
- **ACM**: SSL certificates for both domains

### CI/CD Pipeline

GitHub Actions workflow:
1. Lint code (ESLint)
2. Check formatting (Prettier)
3. Build site (Astro)
4. Run tests (Vitest)
5. Validate SAM template

## Pages Delivered

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, services overview, CTAs |
| Services | `/services` | Detailed service listings |
| About | `/about` | Company history, values, service area |
| Contact | `/contact` | Contact form and business info |
| Reviews | `/reviews` | Customer testimonials |

## Pending Items

1. **SES Email Verification**: Awaiting verification of mikemitchellplumber@gmail.com
2. **Domain Transfer**: greenevilleplumber.com transfer from HostGator to AWS in progress
3. **DNS Configuration**: Set up Route 53 hosted zones once domains transfer
4. **Custom Domains**: Add both domains to CloudFront with SSL

## Success Metrics

- Site loads in under 2 seconds
- All pages return 200 status
- Contact form successfully sends emails
- Mobile Lighthouse score > 90
- CI pipeline passes on all commits

## Future Enhancements

- Google Business Profile integration for reviews
- Online scheduling/booking system
- Service area map
- Photo gallery of completed work
- Blog for plumbing tips and SEO
