#!/bin/bash
set -eu

REPO_DIR="$(git rev-parse --show-toplevel)"
VERSION="$(git rev-parse --short HEAD)"

usage() {
  local prog
  prog=$(basename "$0")
  cat <<EOF
Usage: ${prog} [ OPTIONS... ]

  Deploy the application to Amazon Elastic Beanstalk

  Options:
    --version "${VERSION}"           Version of the container to deploy. Default to the
                                  current commit sha (${VERSION})

  Usage:
    ${prog}
      Deploy the version at HEAD

    ${prog} --version "${VERSION}"
      Deploy a specific tagged version of the application container

EOF
  exit
}


main() {
  cd "${REPO_DIR}/production"
  local version="${VERSION}"

  while [[ "$#" -gt 0 ]]; do
    case "$1" in
      -h|--help)
        usage
        ;;
      --version)
        shift;
        version="$1"
        ;;
      -*|--*|*)
        echo "unknown option '$1'"
        exit 1
        ;;
    esac
    shift
  done

  echo "Do you wish to deploy version: "
  read -p "Continue with deployment of: ${version} [y/N]" -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      echo "Exiting!"
      exit 1;
  fi;

  local tmp_dest;
  tmp_dest=$(mktemp)

  sed "s/<<version>>/${version}/g" "Dockerrun.aws.template.json" > "Dockerrun.aws.json"
  echo "Deploying:"
  cat "Dockerrun.aws.json"
  eb deploy deja-brew-prod -r ap-southeast-2
}

main "$@"
