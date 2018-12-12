#!/bin/bash

# =============
# Configuration
# =============

SUBCOMMAND=$1
ES=$2
ES=${ES:=localhost:9200}
INDEX=jawikibooks-20181203
WMLANG=ja
WMPROJ=wikibooks
WMDUMP=jawikibooks-20181203-cirrussearch-content.json.gz
WMSITE=${WMLANG}.${WMPROJ}.org
export ES INDEX WMLANG WMDUMP WMSITE

# =============
# Wrappers
# =============

CURL() {
  curl -s -H 'Content-Type: application/json' $@
}

CURL_POST() {
  CURL -XPOST $@
}

CURL_PUT() {
  CURL -XPUT $@
}

CURL_DELETE() {
  CURL -XDELETE $@
}

# =============
# Functions
# =============

es_load() {
  pushd chunks

  for file in *; do
    echo -n "${file}:  "
    OUT=$( CURL_POST $ES/$INDEX/_bulk?pretty --data-binary @$file )
    TOOK=$(echo $OUT|
      grep took | cut -d':' -f 2 | cut -d',' -f 1)
    printf '%7s\n' $TOOK
    [ "x$TOOK" = "x" ] || rm $file
  done

  popd
}

es_setup() {
  HEAD=$( CURL --head $ES/$INDEX )
  HEADHEAD=$(echo $HEAD | head -n 1 | grep '404')
  [ "x$HEADHEAD" != "x" ] || CURL_DELETE $ES/$INDEX

  CURL -s 'https://'$WMSITE'/w/api.php?action=cirrus-settings-dump&format=json&formatversion=2' |
    jq '.content.page.index.analysis.analyzer.text.type = "kuromoji"' |
    jq '.content.page.index.analysis.analyzer.text_search.type = "kuromoji"' |
    jq '{
    analysis: .content.page.index.analysis,
    number_of_shards: 1,
    number_of_replicas: 0
  }' |
  CURL_PUT $ES/$INDEX?pretty -d @-

  CURL -s 'https://'$WMSITE'/w/api.php?action=cirrus-mapping-dump&format=json&formatversion=2' |
    jq .content |
    sed 's/"index_analyzer"/"analyzer"/' |
    sed 's/"position_offset_gap"/"position_increment_gap"/' |
    CURL_PUT $ES/$INDEX/_mapping/page?pretty -d @-

  CURL --head $ES/$INDEX
}

es_split() {
  test -d chunks || mkdir chunks
  pushd chunks
  zcat ../$WMDUMP | split -a 10 -l 500 - $INDEX
  popd
}

es_usage() {
  echo $0 setup localhost:9200
  echo $0 split
  echo $0 load localhost:9200
}

# =============
# Main
# =============

SUBCOMMAND=es_${SUBCOMMAND:=usage}

$SUBCOMMAND

