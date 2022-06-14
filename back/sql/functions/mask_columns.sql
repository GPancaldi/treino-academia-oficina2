CREATE OR REPLACE FUNCTION public.mask_column(IN column_name character varying,IN id integer)
    RETURNS text
    LANGUAGE 'plpgsql'
    VOLATILE
    PARALLEL UNSAFE
    COST 100
AS $BODY$
BEGIN
    RETURN CONCAT(column_name, ' ', CAST(id as text));
END;
$BODY$;