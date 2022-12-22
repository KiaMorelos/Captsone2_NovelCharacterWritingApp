import axios from "axios";
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL || "http://localhost:8000/api";

const API_CLIENT = axios.create({ baseURL: API_BASE_URL });

class WritingAPI {
  static authToken;

  static async request(url, data = {}, method = "get") {
    const headers = { token: `Bearer ${this.authToken}` };
    const params = method === "get" ? data : {};

    try {
      return (await API_CLIENT({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("WRITING API Error:", err.response.data.error.message);
      return err.response.data.error;
    }
  }

  static async signup(data) {
    const res = await this.request(`signup`, data, "post");
    return res.token;
  }

  static async login(data) {
    const res = await this.request(`authenticate`, data, "post");
    return res.token;
  }

  static async getUser(id) {
    const res = await this.request(`users/${id}`);
    return res.user;
  }

  static async updateUser(id, data) {
    const res = await this.request(`users/${id}`, data, "patch");
    return res.user;
  }

  static async getAllQuestions(data) {
    const res = await this.request(`questions`, data);
    return res.questions;
  }

  static async getAllQuestionaires() {
    const res = await this.request(`questionaires`);
    return res.questionaires;
  }

  static async getAllCharacters() {
    const res = await this.request(`characters`);
    return res.characters;
  }

  static async getCharacter(id) {
    const res = await this.request(`characters/${id}`);
    return res.character;
  }

  static async newCharacter(data) {
    const res = await this.request(`characters`, data, "post");
    return res.character;
  }

  static async patchCharacter(id, data) {
    console.log(data);
    const res = await this.request(`characters/${id}`, data, "patch");
    return res.character;
  }

  static async deleteCharacter(id) {
    await this.request(`characters/${id}`, {}, "delete");
    const remaining = await this.request(`characters`);
    return remaining.characters;
  }
}

export { WritingAPI };
