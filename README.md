# More-Like-This from Wikipedia

A simple program to test more-like-this (MLT) query of Elasticsearch.

This test program powered by React assumes that
Elasticsearch is running on `localhost:9200` and
a CirrusSearch index for a Wikimedia project is registered to
an Elasticsearch index whose name is specified in the `ES_INDEX` variable
in the `start.sh`.

## How to run

Assuming Elasticsearch is running with the above condition met,
the following command launches a Web server on port 3000.
MLT queries can be sent using the Web form on the top page.

```
yarn install
yarn run start
```

