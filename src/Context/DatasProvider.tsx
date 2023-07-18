import { useCallback, useState } from "react";
import { DatasContext } from "./Contexts";
import { getDatasByKeyword } from "../Functions/functions";
import Keyword from "../Components/Keyword";

interface ICache {
  [key: string]: { datas: IData[]; expireTime: number };
}

interface IProps {
  children: React.ReactNode;
}

const SEC = 1000; // 1초
const cacheExpireTime = 60 * SEC; // 1분

export function DatasProvider({ children }: IProps) {
  const [datasByKeyword, setDatasByKeyword] = useState<IData[]>([]);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const cache: ICache = {};

  const setCache = useCallback(
    async (keyword: string) => {
      const datas = await getDatasByKeyword(keyword);

      cache[keyword] = { datas, expireTime: Date.now() + cacheExpireTime };
    },
    [Keyword]
  );

  const pushRecentKeyword = useCallback(
    (keyword: string) => {
      if (recentKeywords.includes(keyword) === false) {
        const newRecentKeywords = [...recentKeywords, keyword];
        setRecentKeywords(newRecentKeywords);
      }
    },
    [Keyword]
  );

  return (
    <DatasContext.Provider
      value={{
        datasByKeyword,
        setDatasByKeyword,
        cache,
        setCache,
        recentKeywords,
        pushRecentKeyword,
      }}
    >
      {children}
    </DatasContext.Provider>
  );
}
