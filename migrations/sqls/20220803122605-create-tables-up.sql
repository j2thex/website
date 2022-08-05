CREATE TABLE public.users (
    id BIGSERIAL,
    ref_id bigint,
    uid uuid UNIQUE NOT NULL,
    state varchar(32) NOT NULL DEFAULT 'active',
    data jsonb,
    created_at timestamp(0) DEFAULT now(),
    updated_at timestamp(0) DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE TABLE public.wallets (
    id BIGSERIAL,
    user_id bigint,
    address VARCHAR (150) UNIQUE NOT NULL,
    state varchar(20) NOT NULL,
    created_at timestamp(0) DEFAULT now(),
    updated_at timestamp(0) DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE TABLE public.phones (
    id BIGSERIAL,
    user_id bigint,
    number varchar(128) UNIQUE NOT NULL,
    code varchar(20),
    sent_at timestamp(0),
    verified_at timestamp(0),
    created_at timestamp(0) DEFAULT now(),
    updated_at timestamp(0) DEFAULT now(),
    PRIMARY KEY (id)
);

