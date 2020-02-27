#!/bin/bash

build_frontend() {
  pushd frontend >/dev/null;
  npm run build;
  docker build -t deja_brew_frontend .
  popd >/dev/null;
}

build_backend() {
  pushd backend >/dev/null;
  docker build -t deja_brew_backend .
  popd >/dev/null;
}

main() {
  build_frontend;
  build_backend;
}

main "$@"
