#!/bin/bash

# Fix from: https://gist.github.com/liamwh/980b034106030f774a3563ec5fbd441e
# Issue: https://github.com/open-telemetry/opentelemetry-js/issues/3989
# tl;dr, the ESM output is wrong, it has a require call in it.

# This file should run in the Dockerfile when building, not for dev.

packages="./node_modules/@opentelemetry/*/package.json"

for file in ${packages}; do
  sed -i '/"module": "build\/esm\/index\.js",/d' ${file}
done