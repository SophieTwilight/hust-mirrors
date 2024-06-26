#!/bin/env bash
# Usage: update-pages.sh <src_dir> <obj_dir>

set -e

src_dir="$1"
obj_dir="$2"

tag='origin/prod'

cd "$src_dir" || exit

git fetch --all
git checkout $tag
yarn && yarn build
cp -rf ./build/* "$obj_dir"
