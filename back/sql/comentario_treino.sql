CREATE TABLE public.comentario_treino
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    comentario text,
    treino_id integer,
    user_id integer,
    isdeleted boolean,
    CONSTRAINT pkey_comentario PRIMARY KEY (id),
    CONSTRAINT fkey_treino FOREIGN KEY (treino_id)
        REFERENCES public.treino (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fkey_user FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.comentario_treino
    OWNER to faculdade;