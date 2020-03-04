#!/bin/bash
set -eu

REPO_DIR=$(git rev-parse --show-toplevel)

DOCKER_TAG="nickw444/deja-brew"
COMMIT_SHA="$(git describe --dirty --always)"

build_and_copy_frontend() {
  # Run webpack build to produce production-ready assets for the frontend
  pushd frontend >/dev/null;
  npm run build;
  popd >/dev/null;

  # Copy compiled FE assets into the backend static directory, ready for bundling into the Docker
  # container
  mkdir -p "backend/deja_brew/frontend/build"
  cp -r frontend/build/{asset-manifest.json,static} "backend/deja_brew/frontend/build"
}

build_backend_container() {
  docker build -t "$DOCKER_TAG:$COMMIT_SHA" backend
}

push_backend_container() {
  docker push "$DOCKER_TAG:$COMMIT_SHA"
}

main() {
  cd "${REPO_DIR}"

  build_and_copy_frontend;
  build_backend_container;
  push_backend_container;
}

main "$@"
