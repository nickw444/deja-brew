#!/bin/bash
set -eu

main() {
  eb create deja-brew-prod \
    --region ap-southeast-2 \
    --envvars SECRET_KEY=$SECRET_KEY,GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET,GOOGLE_HOSTED_DOMAIN=$GOOGLE_HOSTED_DOMAIN,DATABASE_URI=sqlite://:memory:
}

main "$@"
