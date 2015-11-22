#!/bin/bash
echo "$TRAVIS_BRANCH"
echo "Starting deploying process"
if [ "$TRAVIS_BRANCH" == "master" ]; then
  npm run deploy
fi
