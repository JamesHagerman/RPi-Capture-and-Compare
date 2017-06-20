#!/bin/bash
DERP=~pi/capture/files
FULLDERP=`readlink -f $DERP`
echo "$FULLDERP/`ls -Art $DERP | grep -v "\~" | tail -n1`"
