import { useState } from "react";
import { DatasContext } from "./Contexts";
import { getDatasByKeyword } from "../Functions/functions";

interface ICache {
  [key: string]: { datas: IData[]; expireTime: number };
}

interface IProps {
  children: React.ReactNode;
}

const CACHE = "cache";
const SEC = 1000; // 1초
const cacheExpireTime = 60 * SEC; // 1분

export function DatasProvider({ children }: IProps) {
  const [datasByKeyword, setDatasByKeyword] = useState<IData[]>([]);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  // const cache: ICache = {};

  const setCachedData = async (keyword: string) => {
    const datas = await getDatasByKeyword(keyword);
    const keywordData = { datas, expireTime: Date.now() + cacheExpireTime };

    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache = JSON.parse(localStorageCache);
      cache[keyword] = keywordData;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    } else {
      const cache: ICache = {};
      cache[keyword] = keywordData;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    }
  };

  const getCachedData = async (keyword: string) => {
    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache: ICache = JSON.parse(localStorageCache);
      const keyExists = cache.hasOwnProperty(keyword);

      if (keyExists) {
        return cache[keyword];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  const removeCachedData = async (keyword: string) => {
    let localStorageCache = localStorage.getItem(CACHE);

    if (localStorageCache) {
      let cache: ICache = JSON.parse(localStorageCache);

      delete cache.keyword;

      localStorage.setItem(CACHE, JSON.stringify(cache));
    }
  };

  const pushRecentKeyword = (keyword: string) => {
    if (recentKeywords.includes(keyword) === false) {
      const newRecentKeywords = [...recentKeywords, keyword];
      setRecentKeywords(newRecentKeywords);
    }
  };

  return (
    <DatasContext.Provider
      value={{
        datasByKeyword,
        setDatasByKeyword,
        setCachedData,
        getCachedData,
        removeCachedData,
        recentKeywords,
        pushRecentKeyword,
      }}
    >
      {children}
    </DatasContext.Provider>
  );
}
