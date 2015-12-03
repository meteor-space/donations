#!/usr/bin/env bash

export PACKAGE_DIRS='packages'
source ./environment.sh # Customize environment

if [ "$PORT" ]; then
  meteor test-packages packages/domain --port $PORT
else
   meteor test-packages packages/domain
fi
