 CREATE OR REPLACE VIEW masked.users
 AS
 SELECT users.id,
    users.user_role_id,
    'XXXX@EMAIL.COM'::text AS email,
    'XXX.XXX.XXX-XX'::text AS cpf,
    'XX.XXX.XXX-X'::text AS rg,
    users.data_nascimento,
    'XXXXXX'::text AS password,
    mask_column('Usuário'::character varying, users.id) AS name,
    users.isdeleted

    
FROM users;