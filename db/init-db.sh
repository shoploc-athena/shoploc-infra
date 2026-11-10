#!/bin/bash
# Runs once, when the database volume is created for the first time.
# Creates one database and one owner per service instance (Lille only for now).
# To add Paris later, add three more create_db lines.
set -e

create_db() {
  local name="$1" user="$2" password="$3"
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres <<SQL
CREATE USER $user WITH PASSWORD '$password';
CREATE DATABASE $name OWNER $user;
REVOKE ALL ON DATABASE $name FROM PUBLIC;
SQL
}

create_db user_lille  user_lille  "$USER_LILLE_DB_PASSWORD"
create_db store_lille store_lille "$STORE_LILLE_DB_PASSWORD"
create_db order_lille order_lille "$ORDER_LILLE_DB_PASSWORD"
