CREATE TABLE public.treino
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text,
    PRIMARY KEY (id)
);

ALTER TABLE public.treino
    OWNER to faculdade;