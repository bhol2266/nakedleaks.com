import algoliasearch from 'algoliasearch';

const client = algoliasearch('IML4U4JLZD', 'e86bd968161417c3c383921f340a8170');
const index = client.initIndex('posts');

export default index;
