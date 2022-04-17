CREATE TABLE public.userrole
(
    id integer NOT NULL,
    nome text,
    PRIMARY KEY (id)
);

ALTER TABLE public.userrole
    OWNER to faculdade;

ALTER TABLE public.userrole
    ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;