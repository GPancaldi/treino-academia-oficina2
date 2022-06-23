CREATE ROLE masked WITH
	LOGIN
	SUPERUSER
	CREATEDB
	CREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';

ALTER ROLE masked IN DATABASE postgres
    SET search_path TO '$user', masked, public;