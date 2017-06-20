#!/bin/bash

echo "Hosting captured images on port Pi, localhost:8001"
#cd ~pi/capture/files
python -m SimpleHTTPServer 8001

