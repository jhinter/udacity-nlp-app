import { updateUI } from "../js/formHandler.js";

const mockApiResponseBody = {
  polarity: "negative",
  polarity_confidence: 0.4453410506248474,
  subjectivity: "unknown",
  subjectivity_confidence: 0,
  text: "Megafone ist/ sind na",
};

describe("Testing updateUI triggered by handleSubmit", () => {
  test("All 4 relevant result dimensions should be appended to results block ('text' excluded).", () => {
    document.body.innerHTML = `
      <div id="results"></div>
    `;

    updateUI(mockApiResponseBody);

    const results = document.getElementById("results");
    expect(results.childElementCount).toEqual(4);
  });
});
