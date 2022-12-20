import axios from "axios";

const API_BASE_URL = "https://api.api-ninjas.com/v1/";
const BABY_NAME_API_KEY = process.env.REACT_APP_BABY_NAME_API_KEY;

const API_CLIENT = axios.create({
  baseURL: API_BASE_URL,
  headers: { "X-Api-Key": BABY_NAME_API_KEY },
  contentType: "application/json",
});

async function genFirstNames(gender) {
  try {
    const result = await API_CLIENT.get(`babynames`, {
      params: { gender },
    });
    return result.data;
  } catch (err) {
    console.error("BABY NAME API Error:", err.response.data.error);
    return err.response.data.error;
  }
}

export { genFirstNames };
