#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
	CREATE TABLE participant(
		name TEXT PRIMARY KEY,
		address TEXT,
		nats TEXT,
		nats_key TEXT,
		zkp_key TEXT,
		role TEXT
	);

	CREATE TABLE shipment(
		id SERIAL PRIMARY KEY,
		cargo_hash TEXT,
		escrow_address TEXT,
		owner TEXT references participant,
		cargo json
	);

	CREATE TABLE offer(
		id SERIAL PRIMARY KEY,
		shipment_id integer references shipment,
		financer TEXT,
		price numeric(12,6),
		buyback numeric(12,6)
	);

	CREATE TABLE keyvalue(
		key TEXT PRIMARY KEY,
		value TEXT
	);
  COMMIT;
EOSQL