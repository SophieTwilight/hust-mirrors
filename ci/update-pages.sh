#!/bin/env bash
# Usage: update-pages.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

cd "$src_dir" || exit

last_commit=$(git rev-parse stable)
git pull origin stable:stable
current_commit=$(git rev-parse stable)

if [[ "$last_commit" != "$current_commit" ]]; then
  yarn && yarn build
  cp ./build/* "$obj_dir"
fi
