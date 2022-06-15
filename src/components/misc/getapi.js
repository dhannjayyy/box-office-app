const API_URL = "https://api.tvmaze.com";

async function GET_API(searchString) {
  const response = await fetch(`${API_URL}${searchString}`).then((response) =>
    response.json()
  );

  return response;
}

export default GET_API;