#!/bin/bash

# Hostinger Deployment Script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 Starting deployment to Hostinger..."

# Configuration
HOSTINGER_HOST="your-ftp-host"
HOSTINGER_USER="your-ftp-user"
HOSTINGER_PASS="your-ftp-password"
REMOTE_DIR="/public_html"
LOCAL_DIR="./out"

# Check if out directory exists
if [ ! -d "$LOCAL_DIR" ]; then
  echo "❌ Error: $LOCAL_DIR directory not found. Run 'npm run build' first."
  exit 1
fi

# Check if lftp is installed
if ! command -v lftp &> /dev/null; then
  echo "❌ Error: lftp is not installed. Install it with: sudo apt-get install lftp"
  exit 1
fi

echo "📤 Uploading files to Hostinger..."

# Deploy using lftp
lftp -u "$HOSTINGER_USER","$HOSTINGER_PASS" "$HOSTINGER_HOST" << EOF
set ssl:verify-certificate no
set ftp:ssl-allow no
set ftp:passive-mode yes
mirror -R --delete --verbose "$LOCAL_DIR" "$REMOTE_DIR"
bye
EOF

echo "✅ Deployment complete!"
echo "🌐 Your site should be live at: https://nexosingenieria.com"
