import algoliaSearch from "algoliasearch";

// Connect and authenticate with your Algolia app
const client = algoliaSearch("682E5D6S3G", process.env.ALGOLIA_KEY);

// Create a new index and add a record
const commercesIndex = client.initIndex("commerces");

export { commercesIndex };
