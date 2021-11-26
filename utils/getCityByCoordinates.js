import env from "../env.json"

export default async function (coords) {
  let { latitude, longitude } = coords;
  let resp = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${env.geolocationServiceAPIKey}`);
  let data = await resp.json();
  let result = data.results[0].components?.suburb ? `${data.results[0].components.city} - ${data.results[0].components.suburb}` : `${data.results[0].components.state} - ${data.results[0].components.city}`;
  return result
}