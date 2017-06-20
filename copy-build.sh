#!/bin/bash

echo "Build the react app first!!"
echo
echo "Copying the built React app into the Feathers backend"

cp -r ./frontend/build/* ./backend/public/

echo "Now start the node server (backend) and the capture.py script"