#!/bin/bash

cd view && npm run build && cd ..

rm -rf ./build
mkdir ./build

mkdir ./build/view

cp -R ./view/dist ./build/view
