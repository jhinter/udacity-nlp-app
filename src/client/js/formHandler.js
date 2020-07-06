import { fetchAnalysis } from "./fetchAnalysis";

// handles form submit
async function handleSubmit(event) {
  event.preventDefault();
  try {
    const url = document.getElementById("url").value;
    const apiResponse = await fetchAnalysis(url);
    updateUI(apiResponse);
  } catch (error) {
    alert(error);
  }
}

// updates ui with results from node backend
function updateUI(apiResponse) {
  const listElements = Object.keys(apiResponse).map((key) => {
    if (key === "text") return;
    return `<li><strong>${key}</strong>: ${apiResponse[key]}</li>`;
  });
  document.getElementById("results").innerHTML = listElements.join("");
}

export { handleSubmit, updateUI };

