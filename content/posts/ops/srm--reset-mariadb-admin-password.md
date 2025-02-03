---
title: "SRM : Reset Admin Password on MariaDB"
date: 2025-02-03
categories: ["ops"]
tags: ["SRM","MariaDB"]
---

How to reset admin password on MariaDB from SRM (Softeware Risk Manager).

---

This script recovers from a lost or forgotten super-admin password. It resets both the super-admin password and the database root user password to the provided value By SRM

---
```bash
#!/bin/bash

# This script recovers from a lost or forgotten super-admin password.
# It resets both the super-admin password and the database root user password to the provided value.
# By SRM

function admin-password-recover-script() {
  ### Validate input and set SRM installation path
  if [ "$#" -ne 1 ] && [ "$#" -ne 0 ]; then
    echo "Usage: $0 [path to SRM installation folder]"
    echo "If path contains spaces, wrap it in double quotes."
    echo "Example:"
    echo "   $0 /opt/srm"
    exit 1
  fi

  local SRM_PATH
  if [ "$#" -eq 1 ]; then
    SRM_PATH=$1
  else
    echo "Enter path to SRM installation folder:"
    read -r SRM_PATH
  fi

  # Remove trailing slash from the input path
  SRM_PATH=${SRM_PATH%/}

  # Check for MariaDB binary file
  if [ ! -f "$SRM_PATH/mysql/bin/mysqld" ]; then
    echo "The given SRM directory does not appear to have appropriate mysql files"
    exit 2
  fi

  ### Get new password
  echo "Enter new administrator password:"
  read -rs NEW_PASSWORD

  ### Create temporary initialization file
  TEMP_INIT_FILE=$(mktemp)

  ### Check MariaDB configuration file
  echo "Looking for MariaDB configuration file..."
  DB_CONFIG=$SRM_PATH/mysql/my.cnf

  if [ ! -f "$DB_CONFIG" ]; then
    echo "$DB_CONFIG not found. Aborting"
    exit 2
  fi

  ### Check MariaDB data directory from SRM properties file
  echo "Found MariaDB configuration at $DB_CONFIG"
  echo "Looking for SRM database..."
  DB_DATA=$(grep "mysql_data_directory" "$SRM_PATH/properties.ini" | cut -d'=' -f2)

  if [ ! -d "$DB_DATA" ]; then
    echo "MariaDB data directory not found (looked at $DB_DATA). Aborting"
    exit 2
  fi

  ### Verify SRM database
  echo "Found MariaDB data directory at $DB_DATA"
  DB_NAME=srm
  if [ ! -d "$DB_DATA/$DB_NAME" ]; then
    DB_NAME=bitnami_srm
  fi
  if [ ! -d "$DB_DATA/$DB_NAME" ]; then
    echo "SRM database not found. Aborting"
    exit 2
  fi
  echo "Found SRM database $DB_NAME"

  ### Generate MariaDB initialization file
  echo "Generating MariaDB recovery init file..."
  {
    echo "SET PASSWORD FOR 'root'@'localhost' = PASSWORD('${NEW_PASSWORD//\'/\'\'}');"
    echo "UPDATE \`$DB_NAME\`.\`LOCAL_USERS\` SET \`PASSWORD\`=SHA2('${NEW_PASSWORD//\'/\'\'}', 256) WHERE \`ID\`=1;"
    echo "SHUTDOWN;"
  } > "$TEMP_INIT_FILE"

  ### Stop SRM services
  echo "Shutting down SRM services"
  "$SRM_PATH/ctlscript.sh" stop

  ### Reset passwords
  echo "Resetting passwords..."

  # If root user, set file permissions and run as mysql user
  if (( EUID == 0 )); then 
    chown mysql "$TEMP_INIT_FILE"
    "$SRM_PATH/mysql/bin/mysqld" --defaults-file="$DB_CONFIG" --init-file="$TEMP_INIT_FILE" --console --user=mysql
  else
    "$SRM_PATH/mysql/bin/mysqld" --defaults-file="$DB_CONFIG" --init-file="$TEMP_INIT_FILE" --console
  fi

  ### Clean up and display completion message
  echo "Removing recovery init file..."
  rm -f "$TEMP_INIT_FILE"
  echo "Done! You may start SRM again."
}

# Execute the function
admin-password-recover-script "$@"

Ex) admin-password-recover-script ~/workspace/dev_tool/codedx/srm-2024.12.1/srm
```