# Launch Checklist

## Current Status
- Site: Live at https://drevytctus26z.cloudfront.net
- CI/CD: Passing
- Lambda: Deployed
- Contact Form: Deployed (awaiting SES verification)

---

## Domain Transfer

- [ ] **greenevilleplumber.com** - Transfer from HostGator to AWS Route 53
  - [ ] Unlock domain at HostGator
  - [ ] Get authorization/EPP code from HostGator
  - [ ] Initiate transfer in AWS Route 53
  - [ ] Approve transfer confirmation email
  - [ ] Wait for transfer to complete (5-7 days)

- [ ] **rogersvilleplumber.com** - Transfer from HostGator to AWS Route 53
  - [ ] Unlock domain at HostGator
  - [ ] Get authorization/EPP code from HostGator
  - [ ] Initiate transfer in AWS Route 53
  - [ ] Approve transfer confirmation email
  - [ ] Wait for transfer to complete (5-7 days)

---

## SSL Certificates (ACM)

- [ ] Validate ACM certificate for both domains
  - Certificate ARN: `arn:aws:acm:us-east-1:386507563559:certificate/26b7b9a1-1333-43b7-a0f9-ac0a228f639a`

  **DNS Records to Add (once domains are in Route 53):**

  | Domain | Record Name | Record Value |
  |--------|-------------|--------------|
  | greenevilleplumber.com | `_34abd58447140921d63e0ec2a12f6212` | `_d0b060bbcd16b5589abc640c330b5156.jkddzztszm.acm-validations.aws.` |
  | rogersvilleplumber.com | `_5c921c77e5db01929a22584b0ca99841` | `_85979ef36188c839295f92f7e36c1753.jkddzztszm.acm-validations.aws.` |

- [ ] Wait for certificate status to change to "Issued"

---

## Route 53 DNS Setup

- [ ] Create hosted zone for greenevilleplumber.com
- [ ] Create hosted zone for rogersvilleplumber.com
- [ ] Add ACM validation CNAME records (see above)
- [ ] Add A record (alias) pointing to CloudFront for greenevilleplumber.com
- [ ] Add A record (alias) pointing to CloudFront for www.greenevilleplumber.com
- [ ] Add A record (alias) pointing to CloudFront for rogersvilleplumber.com
- [ ] Add A record (alias) pointing to CloudFront for www.rogersvilleplumber.com

---

## CloudFront Configuration

- [ ] Add alternate domain names (CNAMEs) to distribution:
  - greenevilleplumber.com
  - www.greenevilleplumber.com
  - rogersvilleplumber.com
  - www.rogersvilleplumber.com
- [ ] Attach validated ACM certificate to distribution
- [ ] Create CloudFront invalidation after changes

---

## Email (SES)

- [ ] **Verify sender email**: mikemitchellplumber@gmail.com
  - Check inbox for AWS verification email
  - Click verification link
- [ ] Test contact form submission
- [ ] (Optional) Request SES production access if sending to non-verified emails

---

## Final Testing

- [ ] Test all pages on greenevilleplumber.com
- [ ] Test all pages on rogersvilleplumber.com
- [ ] Test contact form end-to-end
- [ ] Test on mobile devices
- [ ] Test click-to-call functionality
- [ ] Verify SSL certificate shows in browser
- [ ] Check page load speed

---

## Post-Launch

- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google Business Profile links to website
- [ ] Monitor CloudWatch logs for Lambda errors
- [ ] Set up AWS billing alerts

---

## Quick Reference

| Resource | Value |
|----------|-------|
| S3 Bucket | greenevilleplumber.com |
| CloudFront Distribution | E2N9GMNPRF83RB |
| CloudFront URL | https://drevytctus26z.cloudfront.net |
| CloudFront Function | greenevilleplumber-url-rewrite |
| API Gateway | https://2vmjm4hrnh.execute-api.us-east-1.amazonaws.com/prod/contact |
| Lambda Stack | greenevilleplumber-contact |
| ACM Certificate | arn:aws:acm:us-east-1:386507563559:certificate/26b7b9a1-1333-43b7-a0f9-ac0a228f639a |
| GitHub Repo | https://github.com/dipernamike/greenevilleplumber |
