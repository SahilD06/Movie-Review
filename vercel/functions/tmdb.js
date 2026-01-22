export async function handler(event) {
  const API_KEY = process.env.TMDB_API_KEY;
  const endpoint = event.queryStringParameters.endpoint || "";

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `https://api.themoviedb.org/3/${endpoint}${separator}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "TMDB fetch failed" }),
    };
  }
}
