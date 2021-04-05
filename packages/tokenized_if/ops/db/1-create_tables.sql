CREATE TABLE participant(
	id SERIAL PRIMARY KEY,
	name TEXT,
	address bytea
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