#!/usr/bin/env bash

cd ./area && jshint *.js && cd ..
cd ./common && jshint *.js && cd ..
cd ./registration && jshint *.js && cd ..
cd ./world && jshint *.js && cd ..
