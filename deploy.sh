#!/bin/bash

rm -rf dist-old

mv dist dist-old

git checkout main
# Run git pull to update the code
git pull

# Install dependencies with yarn
yarn

# Build your project with yarn
yarn build

docker compose -f docker-compose.prod.yml up -d --build

# Exit the script
exit 0
