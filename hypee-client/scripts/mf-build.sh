#!/bin/bash

cd gnb && npm run build && cd ..
cd tabs && npm run build && cd ..
cd main && npm run build && cd ..

rm -rf ./dist
mkdir ./dist

mkdir ./dist/gnb
mkdir ./dist/tabs
mkdir ./dist/main

cp -R ./gnb/dist ./dist/gnb
cp -R ./tabs/dist ./dist/tabs
cp -R ./main/dist ./dist/main
