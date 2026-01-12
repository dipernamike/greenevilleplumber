.PHONY: dev build deploy test-lambda clean

# Local development
dev:
	docker compose up --build

dev-down:
	docker compose down

# Build frontend
build:
	docker compose run --rm web npm run build

# Install Lambda dependencies
lambda-deps:
	cd lambda && npm install

# Test Lambda locally with SAM
test-lambda: lambda-deps
	sam local invoke ContactFormFunction --event events/contact-test.json

# Start local API with SAM (connects to LocalStack network)
local-api: lambda-deps
	sam local start-api --port 3001 --docker-network greenevilleplumber_default

# Deploy to AWS
deploy-lambda:
	cd lambda && npm install
	sam build
	sam deploy --guided

deploy-site:
	npm run build
	@echo "Upload dist/ to S3 bucket and invalidate CloudFront"
	@echo "aws s3 sync dist/ s3://YOUR_BUCKET --delete"
	@echo "aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths '/*'"

# Clean up
clean:
	rm -rf dist node_modules lambda/node_modules .aws-sam
	docker compose down -v
