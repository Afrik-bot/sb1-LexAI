#!/bin/bash

# MongoDB backup script
# Usage: ./backup-db.sh <backup-name>

# Configuration
BACKUP_DIR="/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME=${1:-"backup_${DATE}"}

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Create backup
mongodump --uri="$MONGODB_URI" --out="${BACKUP_DIR}/${BACKUP_NAME}"

# Compress backup
cd "$BACKUP_DIR" && tar -czf "${BACKUP_NAME}.tar.gz" "$BACKUP_NAME"

# Remove uncompressed backup
rm -rf "${BACKUP_DIR}/${BACKUP_NAME}"

# Keep only last 7 days of backups
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: ${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"