const axios = require('axios');
const wp = require('./wikipedia');

const ES_ENDPOINT = process.env.ES_ENDPOINT;
if (!ES_ENDPOINT) {
  throw new Error('ES_ENDPOINT is undefined');
}

const ES_INDEX = process.env.ES_INDEX;
if (!ES_INDEX) {
  throw new Error('ES_INDEX is undefined');
}

const INCLUDE_THUMBNAILS = process.env.INCLUDE_THUMBNAILS;

// Issue MLT Query to Elasticsearch
const esmlt = (text, size) => {
  const endpoint = ES_ENDPOINT;
  const index = ES_INDEX;
  const apiSpec = {
    method: 'get',
    path: ['', index, '_search'].join('/'),
    body: {
      "size": size,
      "explain": "true",
      "_source": [
        "title",
        "language",
        "opening_text",
        "category"
      ],
      "query": {
        "more_like_this": {
          "fields": [
            "title",
            "opening_text",
            "text"
          ],
          "like": text,
          "minimum_should_match": 1,
          "min_term_freq": 1,
          "min_doc_freq": 10,
          "max_query_terms": 25
        }
      }
    }
  };
  return axios[apiSpec.method](endpoint + apiSpec.path, { data: apiSpec.body });
};

const mlt = (req, res) => (
  esmlt(req.query.freeText, req.query.size).then((resp) => {
    const empty = {
      documents: [],
      thumbnails: {}
    };
    if (resp.status !== 200) {
      return res.json(empty);
    }
    const hits = resp.data.hits.hits;
    if (hits.length <= 0) {
      return res.json(empty);
    }
    if (!INCLUDE_THUMBNAILS) {
      return res.json({
        documents: hits,
        thumbnails: {}
      });
    }
    const titles = hits.map((hit) => (hit._source.title));
    return wp.thumbnails.large(titles, 'ja').then((wpresp) => (
      res.json({
        documents: hits,
        thumbnails: wpresp
      })
    ));
  })
);

module.exports = {
  mlt
};

