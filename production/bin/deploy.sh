#!/bin/bash
set -eu

REPO_DIR=$(git rev-parse --show-toplevel)


DOCKER_TAG="nickw444/deja-brew"
COMMIT_SHA="$(git describe --dirty --always)"

main() {
  cd ${REPO_DIR}/production

  local tmp_dest;
  tmp_dest=$(mktemp)

  sed "s/<<version>>/${COMMIT_SHA}/g" "Dockerrun.aws.template.json" > "Dockerrun.aws.json"
  echo "Deploying:"
  cat "Dockerrun.aws.json"
  eb deploy deja-brew-prod -r ap-southeast-2
}

main "$@"
