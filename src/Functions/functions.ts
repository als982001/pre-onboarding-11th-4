import axios from "axios";

const BASE_URL = "http://localhost:4000/sick";

export async function getDatas() {
  console.info("calling api");

  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDatasByKeyword(keyword: string) {
  console.info("calling api");

  try {
    const response = await axios.get(`${BASE_URL}?q=${keyword}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
