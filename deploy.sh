#!/bin/bash
echo "$TRAVIS_BRANCH"
echo "$TRAVIS_PULL_REQUEST"

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" == false ]; then
  echo "Starting deploying process"
  npm run deploy
fi