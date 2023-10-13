#!/usr/bin/env bash

echo "Starting 2 grapes..."

grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002' &
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001' &

echo "Grapes started."
