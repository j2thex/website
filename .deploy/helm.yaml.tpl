fullnameOverride: ${HELM_RELEASE}
nameOverride: ${HELM_RELEASE}
imagePullSecrets:
  - name: ${PULL_SECRET_NAME}

image:
  repository: ${QUAY_REPO}

service:
  port: ${SVC_PORT}

secrets:
  NEXT_PUBLIC_MAIN_CHAIN_ID: "${NEXT_PUBLIC_MAIN_CHAIN_ID}"
  NEXT_PUBLIC_POLYGON_URL: "${NEXT_PUBLIC_POLYGON_URL}"
  NEXT_PUBLIC_CONTRACT_ADDRESS: "${NEXT_PUBLIC_CONTRACT_ADDRESS}"
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: "${NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}"
  NEXT_PUBLIC_GOOGLE_ANALYTICS: "${NEXT_PUBLIC_GOOGLE_ANALYTICS}"
  NEXT_PUBLIC_SUPABASE_URL: "${NEXT_PUBLIC_SUPABASE_URL}"
  NEXT_PUBLIC_SUPABASE_ANON_KEY: "${NEXT_PUBLIC_SUPABASE_ANON_KEY}"
  NEXT_PUBLIC_RECAPTCHA_SITEKEY: "${NEXT_PUBLIC_RECAPTCHA_SITEKEY}"
  TWILIO_ACCOUNT_SID: "${TWILIO_ACCOUNT_SID}"
  TWILIO_AUTH_TOKEN: "${TWILIO_AUTH_TOKEN}"
  TWILIO_PHONE_NUMBER: "${TWILIO_PHONE_NUMBER}"
  NEXT_PUBLIC_DEV_MODE: "${NEXT_PUBLIC_DEV_MODE}"
  JWT_SECRET: "${JWT_SECRET}"

  # The following is controlled by the external Secret
  # NEXT_PUBLIC_METAMASK_PRIVATE_KEY: "${NEXT_PUBLIC_METAMASK_PRIVATE_KEY}"
  # NEXT_PUBLIC_JWT_PRIVATE_KEY

externalSecretName: yellow-org-external

ingress:
# annotations:
#   cert-manager.io/issuer: zerossl-prod
  redirectTo: ${DOMAIN}
  hosts:
    - host: ${DOMAIN}
      redirectionEnabled: false
      paths:
        - /
    - host: ${REDIRECT_FROM_DOMAIN}
      redirectionEnabled: true
      paths:
        - /
  tls:
    - secretName: ${HELM_RELEASE}-tls
      hosts:
        - ${DOMAIN}
        - ${REDIRECT_FROM_DOMAIN}
