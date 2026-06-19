import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const getAlerts = () =>
  axios.get(`${BASE_URL}/alerts`);

export const createAlert = (data) =>
  axios.post(`${BASE_URL}/alerts`, data);

export const getLogs = () =>
  axios.get(`${BASE_URL}/logs`);