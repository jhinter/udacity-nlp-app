const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

// fetches sentiment analysis from api via node backend
async function fetchAnalysis(url) {
  if (!urlRegex.test(url)) {
    throw new Error(
      'Your URL is not formatted correctly! Please start with "http" or "https".'
    );
  }
  const response = await fetch("/nlp", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  if (response.status !== 200) {
    throw new Error("Error while fetching data!");
  }
  const data = await response.json();
  return data;
}

export { fetchAnalysis };
