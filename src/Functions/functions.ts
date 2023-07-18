import axios from "axios";

export async function getDatas() {
  console.info("calling api");

  try {
    const response = await axios.get("http://localhost:4000/sick");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDatasByKeyword(keyword: string) {
  console.info("calling api");

  try {
    const response = await axios.get(`http://localhost:4000/sick?q=${keyword}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
