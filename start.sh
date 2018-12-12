#!/bin/bash

PROD=$1
ES_ENDPOINT=http://localhost:9200
ES_INDEX=jawikibooks-20181203
INCLUDE_THUMBNAILS=no
REACT_APP_TITLE="MLT Test Form"
REACT_APP_WMPROJ=wikibooks

export ES_ENDPOINT ES_INDEX INCLUDE_THUMBNAILS REACT_APP_TITLE REACT_APP_WMPROJ

if [ x"$PROD" == x"prod" ]
then
  node server
else
  concurrently "node server" "react-scripts start"
fi

