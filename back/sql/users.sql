CREATE TABLE public.users
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    user_role_id integer NOT NULL,
    email text,
    password text,
    name text,
    isdeleted boolean,
    CONSTRAINT pkey_user PRIMARY KEY (id),
    CONSTRAINT fkey_user_role FOREIGN KEY (user_role_id)
        REFERENCES public.userrole (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.users
    OWNER to faculdade;