#!/bin/bash

runtime=$(date)
docker run --rm rarity-bot:latest
echo "ran at $runtime" >> /home/ubuntu/levelup.log
