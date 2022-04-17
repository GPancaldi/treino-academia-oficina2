CREATE TABLE public.exercicio
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text,
    treino_group_id integer,
    repeticoes text,
    series text,
    isdeleted boolean,
    CONSTRAINT pkey_exercicio PRIMARY KEY (id),
    CONSTRAINT fkey_exercicio_treino FOREIGN KEY (treino_group_id)
        REFERENCES public.treino (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.exercicio
    OWNER to faculdade;