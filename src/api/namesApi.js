import axios from "axios";
import { randLastName } from "@ngneat/falso";
import { env } from "./env";

const API_BASE_URL = "https://api.api-ninjas.com/v1/";
const BABY_NAME_API_KEY = env.REACT_APP_BABY_NAME_API_KEY;

const API_CLIENT = axios.create({
  baseURL: API_BASE_URL,
  headers: { "X-Api-Key": BABY_NAME_API_KEY },
  contentType: "application/json",
});

async function generateName(gender) {
  try {
    const result = await API_CLIENT.get(`babynames`, {
      params: { gender },
    });
    const firstName = result.data[0];
    const lastName = randLastName();
    return `${firstName} ${lastName}`;
  } catch (err) {
    console.error("BABY NAME API Error:", err.response.data.error);
    return err.response.data.error;
  }
}

export { generateName };
