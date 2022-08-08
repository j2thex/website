This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## One-click run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/yellorg/website.git)

## Deployment to K8s

To deploy the component to K8s, you should do the following:

1. Install Helm
2. Export all the env-vars
3. Run `.deploy/install.sh`
4. Enjoy

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Then, run **Prismic** local development server with slice machine which you can access at <http://localhost:9999>

```bash
npm run slicemachine
```

**Yellow Prismic** available on <https://yellow.prismic.io/>

## Deployment smart contract to Polygon mainnet

1. In contracts/.env you have to do next steps:

- change `POLYGON_URL` to `https://polygon-rpc.com`
- set your `PRIVATE_KEY` of metamask account
- set `SIGNER_ACCOUNT` in .env
- run `npx hardhat run scripts/deploy.ts --network matic`

## Deployment smart contract to Polygon mainnet

1. In contracts/.env you have to do next steps:

- change `POLYGON_URL` to `https://polygon-rpc.com`
- set your `PRIVATE_KEY` of metamask account
- set `SIGNER_ACCOUNT` in .env
- run `npx hardhat run scripts/deploy.ts --network matic`

2. In .env do next things:

- set `NEXT_PUBLIC_MAIN_CHAIN_ID` to 137 (polygon mainnet)
- set `NEXT_PUBLIC_POLYGON_URL` to `https://polygon-rpc.com`
- set `NEXT_PUBLIC_CONTRACT_ADDRESS`
- set `NEXT_PUBLIC_METAMASK_PRIVATE_KEY` to the private key of `SIGNER_ACCOUNT`
- set `NEXT_PUBLIC_JWT_PRIVATE_KEY` to some secret string
- set `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` to your Google Tag Manager ID
- set `NEXT_PUBLIC_GOOGLE_ANALYTICS` to your Google Analitics ID
- set `NEXT_PUBLIC_SUPABASE_URL` taken from supabase: `Project URL`
- set `NEXT_PUBLIC_SUPABASE_ANON_KEY` taken from supabase: `Project API keys`
- set `NEXT_PUBLIC_RECAPTCHA_SITEKEY`
- set envs for twilio: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` and `TWILIO_PHONE_NUMBER`
- set `JWT_SECRET` env taken from supabase
- set `NEXT_PUBLIC_DEV_MODE`: `true` or `false` (default: `false`)

## Preparing deployment

There 2 type of environment secrets in .drone.yml that we need for running Duckies app:

  1. For UAT
  2. For PROD

#### Envs

- `NEXT_PUBLIC_MAIN_CHAIN_ID` - polygon chain id (production - 137, uat - 80001)
- `NEXT_PUBLIC_POLYGON_URL` - polygon rpc url
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - duckies proxy smart contract address
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` - google tag manager id
- `NEXT_PUBLIC_GOOGLE_ANALYTICS` - google analytics id
- `NEXT_PUBLIC_SUPABASE_URL` - supabase project url
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - supabase project anon key
- `NEXT_PUBLIC_RECAPTCHA_SITEKEY` - google recaptcha sitekey
- `NEXT_PUBLIC_METAMASK_PRIVATE_KEY` - metamask account private key
- `NEXT_PUBLIC_DEV_MODE` - env for devepoment mode message (by default: `false`)
- `TWILIO_ACCOUNT_SID` - Twilio Account SID
- `TWILIO_AUTH_TOKEN` - Twilio Account Auth Token
- `TWILIO_PHONE_NUMBER`- Twilio +18562633514
- `JWT_SECRET` - Project JWT Settings JWT secret

#### UAT secrets

- `NEXT_PUBLIC_MAIN_CHAIN_ID` - `next_public_main_chain_id_uat`
- `NEXT_PUBLIC_POLYGON_URL` - `next_public_polygon_url_uat`
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - `next_public_contact_address_uat`
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` - `next_public_google_tag_manager_id_uat`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS` - `next_public_google_analytics_uat`
- `NEXT_PUBLIC_SUPABASE_URL` - `next_public_supabase_url_uat`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - `next_public_supabase_anon_key_uat`
- `NEXT_PUBLIC_RECAPTCHA_SITEKEY` - `next_public_recaptcha_sitekey_uat`
- `NEXT_PUBLIC_METAMASK_PRIVATE_KEY` - `next_public_metamask_private_key_uat`
- `NEXT_PUBLIC_DEV_MODE` - `next_public_dev_mode_uat`
- `TWILIO_ACCOUNT_SID` - `twilio_account_sid_uat`
- `TWILIO_AUTH_TOKEN` - `twilio_auth_token_uat`
- `TWILIO_PHONE_NUMBER`- `twilio_phone_number_uat`
- `JWT_SECRET` - `supabase_jwt_secret_uat`

#### PROD secrets

- `NEXT_PUBLIC_MAIN_CHAIN_ID` - `next_public_main_chain_id`
- `NEXT_PUBLIC_POLYGON_URL` - `next_public_polygon_url`
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - `next_public_contact_address`
- `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` - `next_public_google_tag_manager_id`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS` - `next_public_google_analytics`
- `NEXT_PUBLIC_SUPABASE_URL` - `next_public_supabase_url`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - `next_public_supabase_anon_key`
- `NEXT_PUBLIC_RECAPTCHA_SITEKEY` - `next_public_recaptcha_sitekey`
- `NEXT_PUBLIC_METAMASK_PRIVATE_KEY` - `next_public_metamask_private_key`
- `TWILIO_ACCOUNT_SID` - `twilio_account_sid`
- `TWILIO_AUTH_TOKEN` - `twilio_auth_token`
- `TWILIO_PHONE_NUMBER` - `twilio_phone_number`
- `JWT_SECRET` - `supabase_jwt_secret`

#### Running Migrations

Please, be sure you have those environment variables before doing migration process in dev mode
All those envs are exposing information of your database

- `DATABASE_USER`
- `DATABASE_PASSWORD`
- `DATABASE_HOST`
- `DATABASE_NAME`
- `DATABASE_PORT`

When first running the migrations, all will be executed in sequence. A table named migrations will also be created in your database to track which migrations have been applied.
`$ db-migrate up`

You can also run a specific number of migrations with the -c option:
`$ db-migrate up -c 1`

All of the down migrations work identically to the up migrations by substituting the word `down` for `up`.

-----
