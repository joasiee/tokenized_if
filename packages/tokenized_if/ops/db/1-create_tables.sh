#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
	CREATE TABLE participant(
		id SERIAL PRIMARY KEY,
		name TEXT,
		address bytea,
		nats TEXT
	);

	CREATE TABLE shipment(
		id SERIAL PRIMARY KEY,
		owner_id integer references participant,
		data json,
		data_hash bytea
	);

	CREATE TABLE offer(
		id SERIAL PRIMARY KEY,
		shipment_id integer references shipment,
		financer_id integer references participant,
		contract_address bytea NOT NULL,
		price numeric(12,6),
		buyback numeric(12,6)
	);
  COMMIT;
EOSQL