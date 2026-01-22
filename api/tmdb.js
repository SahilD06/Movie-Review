export default async function handler(req, res) {
  const API_KEY = process.env.TMDB_API_KEY;
  const endpoint = req.query.endpoint || "";

  if (!API_KEY) {
    return res.status(500).json({ error: "TMDB API key missing" });
  }

  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `https://api.themoviedb.org/3/${endpoint}${separator}api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: "TMDB fetch failed" });
  }
}
