#!/bin/bash

cd app && npm run build && cd ..

rm -rf ./build

mkdir ./build
mkdir ./build/app

cp -R ./app/dist ./build/app