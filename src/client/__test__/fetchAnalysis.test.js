import { fetchAnalysis } from "../js/fetchAnalysis";

const mockApiResponseBody = {
  polarity: "negative",
  polarity_confidence: 0.4453410506248474,
  subjectivity: "unknown",
  subjectivity_confidence: 0,
  text: "Megafone ist/ sind na",
};

describe("Testing the fetchAnalysis functionality", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => mockApiResponseBody,
    })
  );

  beforeEach(() => {
    fetch.mockClear();
  });

  test("The fetchAnalysis should return mockApiResponseBody object if valid url is provided", async () => {
    // valid url matching regex
    const url = "https://google.com";
    const result = await fetchAnalysis(url);
    expect(JSON.stringify(result)).toBe(JSON.stringify(mockApiResponseBody));
  });

  test("Error should be thrown, if url provided is not maching regex.", async () => {
    // invalid url not matching regex
    const url = "blablabla";
    try {
      const result = await fetchAnalysis(url);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty(
        "message",
        'Your URL is not formatted correctly! Please start with "http" or "https".'
      );
    }
  });

  test("Error should be thrown, if backend status code not 200", async () => {
    const url = "https://google.com";
    // fake server error with status 500
    fetch.mockImplementationOnce(() => Promise.resolve({ status: 500 }));
    try {
      const result = await fetchAnalysis(url);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty("message", "Error while fetching data!");
    }
  });
});
