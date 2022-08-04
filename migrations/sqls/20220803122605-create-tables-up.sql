CREATE TABLE public.country_codes (
    id bigint NOT NULL,
    phone_code text,
    short_name text,
    full_name text,
    flag_href text
);

CREATE TABLE public.emails (
    address text NOT NULL,
    email text NOT NULL
);

CREATE TABLE public.otp (
    phone_number text NOT NULL,
    otp text,
    address text,
    "reverifyAt" timestamp without time zone DEFAULT now(),
    "resendAt" timestamp without time zone DEFAULT now()
);

CREATE TABLE public.rewards (
    address text NOT NULL,
    last_daily_received_at timestamp without time zone,
    daily_streak_count smallint DEFAULT '0'::smallint
);

CREATE TABLE public.users (
    address text DEFAULT ''::text NOT NULL,
    phone_number text,
    state text DEFAULT 'active'::text NOT NULL,
    phone_verified boolean DEFAULT false NOT NULL,
    is_agreed_with_policies boolean DEFAULT false NOT NULL
);
