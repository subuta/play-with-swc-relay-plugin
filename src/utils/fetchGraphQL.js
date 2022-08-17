async function fetchGraphQL(text, variables) {
  // Fetch data from Star Wars GraphQL API:
  // SEE: [Home | Star Wars@current | Studio](https://studio.apollographql.com/public/star-wars-swapi)
  const response = await fetch('https://swapi-graphql.netlify.app/.netlify/functions/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
