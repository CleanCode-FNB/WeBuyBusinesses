import axios from "axios";

const API_URL = "http://localhost:8080/sell";

export const getAllSellEntries = async () => {
  return axios.get(`${API_URL}/all`);
};

export const addSellEntry = async (sellData) => {
  return axios.post(`${API_URL}/add`, sellData);
};

export const deleteSellEntry = async (regCode) => {
  return axios.delete(`${API_URL}/${regCode}`);
};

axios
  .post("http://localhost:8080/api/listings", listing)
