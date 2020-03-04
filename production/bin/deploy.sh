#!/bin/bash
set -eu

REPO_DIR="$(git rev-parse --show-toplevel)"


DOCKER_TAG="nickw444/deja-brew"
VERSION="$(git rev-parse --short HEAD)"

main() {
  cd "${REPO_DIR}/production"

  local tmp_dest;
  tmp_dest=$(mktemp)

  sed "s/<<version>>/${VERSION}/g" "Dockerrun.aws.template.json" > "Dockerrun.aws.json"
  echo "Deploying:"
  cat "Dockerrun.aws.json"
  eb deploy deja-brew-prod -r ap-southeast-2
}

main "$@"
