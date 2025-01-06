export default async function handler(req, res) {
  const url = "https://html5.gamedistribution.com" + req.url; // Forward the request
  const response = await fetch(url, { headers: { Referer: "https://twoplayergames.org" } });
  const data = await response.text();
  res.status(response.status).send(data);
}
