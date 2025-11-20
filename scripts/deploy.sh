#!/bin/bash

# 배포 스크립트
# 프로젝트를 빌드하고 S3에 업로드합니다

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# S3 설정
BUCKET="course-description-sample"
PREFIX="beta/course/description/render/"
CLOUDFRONT_DIST_ID="E5MKSL111LOOA"

echo -e "${YELLOW}========================================${NC}"
echo -e "${YELLOW}Contents Builder Preview 배포 시작${NC}"
echo -e "${YELLOW}========================================${NC}"

# Step 1: 빌드
echo -e "\n${YELLOW}[1/3] 프로젝트 빌드 중...${NC}"
npm run build
if [ $? -ne 0 ]; then
  echo -e "${RED}빌드 실패${NC}"
  exit 1
fi
echo -e "${GREEN}✓ 빌드 완료${NC}"

# Step 2: S3에 업로드
echo -e "\n${YELLOW}[2/3] S3에 업로드 중... (s3://${BUCKET}/${PREFIX})${NC}"
aws s3 sync dist/ "s3://${BUCKET}/${PREFIX}" \
  --delete \
  --metadata-directive REPLACE \
  --exclude "*.html" \
  --exclude "*.css" \
  --exclude "*.js"

# HTML, CSS, JS 파일은 캐시 제어 다르게 설정
aws s3 sync dist/ "s3://${BUCKET}/${PREFIX}" \
  --metadata-directive REPLACE \
  --include "*.html" \
  --include "*.css" \
  --include "*.js" \
  --include "*.json"

if [ $? -ne 0 ]; then
  echo -e "${RED}S3 업로드 실패${NC}"
  exit 1
fi
echo -e "${GREEN}✓ S3 업로드 완료${NC}"

echo -e "\n${GREEN}========================================${NC}"
echo -e "${GREEN}배포 완료!${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "S3 경로: s3://${BUCKET}/${PREFIX}"
echo -e "웹 URL: https://internal-devops-api.inflearn.com/beta/course/description/render/"
