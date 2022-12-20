import axios from "axios";

let authToken;
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";

const API_CLIENT = axios.create({ baseURL: API_BASE_URL });

async function request(url, data = {}, method = "get") {
  const headers = { token: `Bearer ${authToken}` };
  const params = method === "get" ? data : {};

  try {
    return (await API_CLIENT({ url, method, data, params, headers })).data;
  } catch (err) {
    console.error("WRITING API Error:", err.response.data.error.message);
    return err.response.data.error;
  }
}

async function attachToken(token) {
  authToken = token;
}

async function signup(data) {
  const res = await request(`signup`, data, "post");
  return res.token;
}

async function login(data) {
  const res = await request(`authenticate`, data, "post");
  return res.token;
}

async function getAllQuestions(data) {
  const res = await request(`questions`, data);
  console.log(res);
  return res.questions;
}

async function getAllQuestionaires() {
  const res = await request(`questionaires`);
  return res.questionaires;
}

async function getAllCharacters() {
  const res = await request(`characters`);
  return res.characters;
}

async function getCharacter(id) {
  const res = await request(`characters/${id}`);
  return res.character;
}

export {
  attachToken,
  signup,
  login,
  getAllQuestions,
  getAllCharacters,
  getAllQuestionaires,
  getCharacter,
};
