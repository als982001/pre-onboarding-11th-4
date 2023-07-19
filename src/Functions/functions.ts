import axios from "axios";
import { db } from "../Datas/db";

const BASE_URL = "http://localhost:4000/sick";
const NETWORK_ERROR = "Network Error";

export async function getDatas() {
  console.info("calling api");

  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error: any) {
    if (error.message === NETWORK_ERROR) {
      console.log("서버와 연결되어 있지 않기 때문에 로컬 데이터를 이용합니다.");
    } else {
      console.log("에러가 발생해 로컬 데이터를 이용합니다.");
    }

    return db;
  }
}

export async function getDatasByKeyword(keyword: string) {
  console.info("calling api");

  try {
    const response = await axios.get(`${BASE_URL}?q=${keyword}`);
    return response.data;
  } catch (error: any) {
    if (error.message === NETWORK_ERROR) {
      console.log("서버와 연결되어 있지 않기 때문에 로컬 데이터를 이용합니다.");
    } else {
      console.log("에러가 발생해 로컬 데이터를 이용합니다.");
    }

    const filtered = db.filter((data) => data.sickNm.includes(keyword));
    return filtered;
  }
}
